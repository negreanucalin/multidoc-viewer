export default class TagService {
    routeHasTag = (route, tag) => {
        for (let i = 0; i < route.tags.length; i++) {
            if (route.tags[i] === tag) {
                return true;
            }
        }
        return false;
    }

    routeHasAllTags = (route, tagList) => {
        if (!route.hasOwnProperty('tags')) {
            return false;
        }
        let tagArray = Array.from(tagList);
        for (let j = 0; j < Array.from(tagArray).length; j++) {
            if (!this.routeHasTag(route, tagArray[j])) {
                return false;
            }
        }
        return true;
    }

    filterRoutesByTags = (categoryList, tagList) => {
        return this.searchRecursive(categoryList, tagList);
    }

    searchRecursive = (categoryList, tagList) => {
        if (tagList.size === 0) {
            return categoryList;
        }
        let list = [];
        for (let i = 0; i < categoryList.length; i++) {
            if (categoryList[i].hasOwnProperty('children')) {
                list = list.concat(this.searchRecursive(categoryList[i].children, tagList));
            }
            if (this.routeHasAllTags(categoryList[i], tagList)) {
                list.push(categoryList[i]);
            }
        }
        return list;
    }
}