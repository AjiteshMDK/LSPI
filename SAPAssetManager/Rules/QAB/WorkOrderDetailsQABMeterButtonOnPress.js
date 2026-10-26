import ButtonOnPress from "./WorkOrderDetailsQABMeterButton";

export default async function WorkorderDetailsQABMeterButtonOnPress(context) {
    let onPress = await ButtonOnPress(context, 'OnPress');
    return context.executeAction(onPress);
}

