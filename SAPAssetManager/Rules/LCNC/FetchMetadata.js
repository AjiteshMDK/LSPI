import Logger from '../Log/Logger';

/**
 * Returns the metadata from the destination as a json string
 * @param {ClientAPI} context
 * @returns {string}
 */
export default async function FetchMetadata(context) {

    try {
        let service = context.getPageDefinition('/SAPAssetManager/Services/AssetManager.service');
        let destination = service.DestinationName;
        let params = { 'method': 'GET' };
        let userInfoUrl = `/${destination}/$metadata`;

        let response = await context.sendRequest(userInfoUrl, params);

        if (response && response.statusCode === 200 && response.content) {
            let xmlString = response.content.toString();
            let result = await context.mdkWindows.xmlParserModule.convertXmlStringToJsonObject(xmlString);
            return JSON.stringify(result);
        } else {
            return '';
        }

    } catch (error) {
        Logger.error('Error during metadata fetch: ' + error.toString());
        return Promise.resolve();
    }

}
