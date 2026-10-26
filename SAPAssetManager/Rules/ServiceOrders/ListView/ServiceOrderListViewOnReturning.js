import CommonLibrary from '../../Common/Library/CommonLibrary';

export default function ServiceOrderListViewOnReturning(context) {
    CommonLibrary.redrawActionBar(context);
    let sectionedTableProxy = context.getControls()[0];
    sectionedTableProxy.redraw();
}
