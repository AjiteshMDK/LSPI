import QABSettingsWindows from "../QAB/QABSettingsWindows";

export default async function FSMOverviewOnLoaded(context) {
  QABSettingsWindows.refreshQABs(context);
}