import ExpensesCount from './ExpensesCount';
import CommonLibrary from '../Common/Library/CommonLibrary';

export default function OnExpensesListReturning(context) {
    CommonLibrary.redrawActionBar(context);
    let pageProxy = context.evaluateTargetPathForAPI('#Page:ExpensesListViewPage');
    let table = pageProxy.getControl('SectionedTable');
    if (table) {
        table.redraw();
    }
    ExpensesCount(context).then(count => context.setCaption(context.localizeText('expenses', [count])));
}
