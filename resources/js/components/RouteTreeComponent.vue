<template>
    <div>
        <v-treeview
                v-on:update:active="emitSelection"
                v-model="tree"
                :open="open"
                :items="items"
                activatable
                item-key="id"
                open-on-click
                return-object
        >
            <template v-slot:prepend="{ item, open }">
                <v-icon v-if="item.children && item.children.length > 0">
                    {{ open ? 'mdi-folder-open' : 'mdi-folder' }}
                </v-icon>
                <v-chip v-else
                        class="ma-2"
                        text-color="white"
                        :color="getColorByMethod(item.request.method)"
                >
                     {{item.request.method}}
                </v-chip>
            </template>
        </v-treeview>
    </div>
</template>

<script>
    import {methodColor} from "../mixins/methodColoringMixin";

    export default {
        mixins: [methodColor],
        props: {},
        mounted() {
            this.$store.watch((state) => state.routeList, (routes) => {
                this.items = routes;
                this.loaded = true;
            });
        },
        computed: {},
        data() {
            return {
                selectedNode: null,
                drawer: false,
                tree: [],
                items: [],
                open: [],
                colorMap: {'GET': 'primary', 'POST': 'green', 'DELETE': 'red', 'PATCH': 'orange', 'OPTIONS': ''}
            };
        },
        methods: {
            emitSelection: function (item) {
                if (item.hasOwnProperty('children')) {
                    this.$emit('selected:category', item[0]);
                } else {
                    this.$emit('selected:route', item[0]);
                }
            }
        }
    }
</script>