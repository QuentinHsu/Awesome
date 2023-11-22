import {
  Action,
  ActionPanel,
  getPreferenceValues,
  Icon,
  List,
} from "@raycast/api";
import dayjs from "dayjs";

interface IPreferences {
  defaultPrefix: string;
}

interface ITimeFormatItem {
  id: string;
  title: string;
  subtitle: string;
  accessory: string;
}

const preferences = getPreferenceValues<IPreferences>();

enum TimeFormatDefault {
  dateTime = "YYYY-MM-DD HH:mm",
  date = "YYYY-MM-DD",
  fullDateTime = "YYYY-MM-DD HH:mm:ss",
}

const timeFormatDefault: string[] = Object.values(TimeFormatDefault);

const timeFormatCustom: string[] = ["YYYYMMDDHHmm"];

const allTimeFormats: string[] = [...timeFormatCustom, ...timeFormatDefault];

const today: Date = new Date();

const ITEMS: ITimeFormatItem[] = allTimeFormats.map((value) => {
  return {
    id: value + Date.now(),
    title: dayjs(today).format(value),
    subtitle: value,
    accessory: "Pressing enter copies the text.",
  };
});

const outputResults: ITimeFormatItem[] = ITEMS;

const defaultPrefix = preferences.defaultPrefix ?? "";

if (preferences.defaultPrefix) {
  outputResults.unshift({
    id: "custom",
    title: defaultPrefix + dayjs(today).format(allTimeFormats[0]),
    subtitle: preferences.defaultPrefix + allTimeFormats[0],
    accessory: "Pressing enter copies the text.",
  });
}

export default function Command() {
  return (
    <List>
      {outputResults.map((item) => (
        <List.Item
          key={item.id}
          icon="time.png"
          title={item.title}
          accessories={[{ icon: Icon.Switch, text: item.accessory }]}
          actions={
            <ActionPanel>
              <Action.CopyToClipboard content={item.title} />
            </ActionPanel>
          }
        />
      ))}
    </List>
  );
}
