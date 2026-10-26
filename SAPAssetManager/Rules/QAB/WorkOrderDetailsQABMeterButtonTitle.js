import ButtonLabel from "./WorkOrderDetailsQABMeterButton";

export default async function WorkorderDetailsQABMeterButtonTitle(context) {
    let title = await ButtonLabel(context, 'Title');
    return title;
}
