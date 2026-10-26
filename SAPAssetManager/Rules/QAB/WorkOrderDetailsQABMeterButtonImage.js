import ButtonImage from "./WorkOrderDetailsQABMeterButton";

export default async function WorkorderDetailsQABMeterButtonImage(context) {
    let image = await ButtonImage(context, 'Image');
    return image;
}
