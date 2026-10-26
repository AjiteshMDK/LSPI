/**
* Describe this function...
* @param {IClientAPI} context
*/
export default function InspectionCharacteristicsEDTSelectedRowsChange(context) {
    const pageProxy = context.getPageProxy();
    if (pageProxy) {
        const extension = pageProxy._page.controls[0].sections[1].extensions[0];
        if (extension) {
            const masterRowIndex = extension.getSelectedMasterRowIndex();
            return pageProxy.getToolbar().setVisible(masterRowIndex !== undefined && masterRowIndex >= 0);  
        }
        return pageProxy.getToolbar().setVisible(false);  
    }
}
