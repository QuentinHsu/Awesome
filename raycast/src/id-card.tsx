import { Action, ActionPanel, List } from "@raycast/api";
import { useCallback, useEffect, useState } from "react";

function generateIDNumber(year?: string, month?: string, day?: string): string {
  year = year ?? "";
  month = month ?? "";
  day = day ?? "";
  // 生成一个位于 min 和 max 之间的随机数
  function randomNumber(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  // 生成一个随机日期，或者使用传入的年月日参数
  function randomDate(year?: number, month?: number, day?: number): string {
    if (!year) {
      year = randomNumber(1950, 2000);
    }
    if (!month) {
      month = randomNumber(1, 12);
    }
    if (!day) {
      day = randomNumber(1, 28);
    }

    return (
      year.toString().padStart(4, "0") +
      month.toString().padStart(2, "0") +
      day.toString().padStart(2, "0")
    );
  }

  // 地址码
  const address = "110000";

  // 出生日期码
  const birth = randomDate(Number(year), Number(month), Number(day));

  // 顺序码
  const sequence = randomNumber(0, 999).toString().padStart(3, "0");

  // 校验码权重
  const weights: number[] = [
    7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2,
  ];

  // 校验码列表
  const validateCodes: string[] = [
    "1",
    "0",
    "X",
    "9",
    "8",
    "7",
    "6",
    "5",
    "4",
    "3",
    "2",
  ];

  const idWithoutCheckBit = address + birth + sequence;

  let sum = 0;

  for (let i = 0; i < idWithoutCheckBit.length; i++) {
    sum += parseInt(idWithoutCheckBit[i]) * weights[i];
  }
  // 计算校验码
  const checkBit = validateCodes[sum % 11];

  return idWithoutCheckBit + checkBit;
}

export default function Command() {
  const [searchText, setSearchText] = useState("");

  const [filteredList, setFilterList] = useState<string[]>([]);

  const generateResult = useCallback(() => {
    if (searchText) {
      const regex = /^(\d{4})(\d{2})(\d{2})$/;

      const match = searchText.match(regex);

      if (match) {
        const year = parseInt(match[1]).toString() || "";

        const month = parseInt(match[2]).toString() || ""; // 月份从 0 开始计数

        const day = parseInt(match[3]).toString() || "";

        const idCardNumber = generateIDNumber(year, month, day);

        return idCardNumber.toString();
      }
    } else {
      return generateIDNumber().toString();
    }
  }, [searchText]);

  useEffect(() => {
    const result = generateResult();

    setFilterList([
      result || "格式不正确！无法解析！请输入形如“20230101”的内容",
    ]);
  }, [searchText, generateResult]);

  return (
    <List
      filtering={false}
      onSearchTextChange={setSearchText}
      navigationTitle="Search Beers"
      searchBarPlaceholder="Search your favorite beer"
    >
      {filteredList.map((item) => (
        <List.Item
          key={item}
          icon="id-card.png"
          title={item}
          actions={
            <ActionPanel>
              <Action.CopyToClipboard content={item} />
            </ActionPanel>
          }
        />
      ))}
    </List>
  );
}
