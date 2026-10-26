export default async function StopTrackingWindows(context, watchID) {
    try {
        const watcherId = Number(watchID);
        await context.mdkWindows.geolocationModule.clearLocationWatch(watcherId);
    }
    catch (error) {
       let message = `${new Date().toLocaleString()} => Failed to remove tracker: ${error}`;
    }
}