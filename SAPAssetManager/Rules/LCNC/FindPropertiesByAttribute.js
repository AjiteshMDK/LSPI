export default function FindPropertiesByAttribute(jsonString, entity, attributes) {
    if (jsonString && entity && attributes) {
        let jsonObj = JSON.parse(jsonString);
        let entityTypeArray = jsonObj['edmx:Edmx']['edmx:DataServices'].Schema.EntityType;
        let entityObj = entityTypeArray.filter(entityType => entityType['@Name'] === entity)[0];
        let entityProperties = entityObj ? entityObj.Property : [];
        let attributesKeys = Object.keys(attributes);
        return entityProperties.filter(entityProperty => {
            return attributesKeys.every(key => {
                return entityProperty['@'+key] === attributes[key];
            });
        });
    } else {
        return [];
    }

}
