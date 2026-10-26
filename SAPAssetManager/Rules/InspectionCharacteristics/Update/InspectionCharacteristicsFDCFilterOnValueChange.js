
export default function InspectionCharacteristicsFDCFilterOnValueChange(context) {
    if (context.getName() === 'Equipment') {
        if (context.getValue().length > 0) {
            context.evaluateTargetPathForAPI('#Page:CreateUpdatePage').getClientData().Equipment = context.getValue()[0].ReturnValue;
        } else {
            context.evaluateTargetPathForAPI('#Page:CreateUpdatePage').getClientData().Equipment = '';
        }
    }

    if (context.getName() === 'FuncLoc') {
        if (context.getValue().length > 0) {
            context.evaluateTargetPathForAPI('#Page:CreateUpdatePage').getClientData().FuncLoc = context.getValue()[0].ReturnValue;
        } else {
            context.evaluateTargetPathForAPI('#Page:CreateUpdatePage').getClientData().FuncLoc = '';
        }
    }

    if (context.getName() === 'FilterSeg') {
        let values = [];
        if (context.getValue().length > 0) {
            context.getValue().forEach(entry => {
                values.push(entry.ReturnValue)
            });  
        }
        context.evaluateTargetPathForAPI('#Page:CreateUpdatePage').getClientData().Segment = values;  
    }

    if (context.getName() === 'Operations') {
        if (context.getValue().length > 0) {
            let operations = [];
            context.getValue().forEach(entry => {
                operations.push(entry.ReturnValue)
            });
            context.evaluateTargetPathForAPI('#Page:CreateUpdatePage').getClientData().OperationsSelected = operations;
        } else {
            context.evaluateTargetPathForAPI('#Page:CreateUpdatePage').getClientData().OperationsSelected = [];
        }
    }
}
