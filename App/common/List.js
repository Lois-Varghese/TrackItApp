import React from "react";
import { SectionList } from "react-native";

export const List = ({
  sections,
  renderItem,
  keyExtractor,
  renderSectionHeader,
}) => {
  return (
    <SectionList
      sections={sections}
      renderItem={renderItem}
      renderSectionHeader={renderSectionHeader}
      keyExtractor={keyExtractor}
    />
  );
};
