import { RadioGroup, Text } from "@slashid/ui";
import type { FocusEventHandler } from "react";
import { useState } from "react";
import { formatRoomPrice, getRooms } from "~/domain/product/product";
import type { ProductId } from "~/domain/product/types";
import ItemCard from "../item-card";
import {
  itemCard,
  itemCardBtn,
  itemCardFooter,
  itemList,
  itemListRadioGroup,
  text,
} from "./style.css";

function ItemList() {
  const rooms = getRooms();
  const [selectedItemId, setSelectedItemId] = useState<ProductId>("");

  const handleSelectedItemChange = (itemId: string) => {
    setSelectedItemId(itemId);
  };

  const resetSelection = () => setSelectedItemId("");

  // reset selection when a click or focus occurs outside of the item list
  const handleItemBlur: FocusEventHandler = (event) => {
    if (event.currentTarget.contains(event.relatedTarget)) return;
    resetSelection();
  };

  return (
    <div className={itemList}>
      <RadioGroup
        className={itemListRadioGroup}
        itemClassName={itemCard}
        itemBtnClassName={itemCardBtn}
        items={rooms.map((room) => ({
          id: room.id,
          content: (
            <ItemCard
              product={room}
              isSelected={selectedItemId === room.id}
              resetSelection={resetSelection}
            />
          ),
          footer: (
            <div className={itemCardFooter}>
              <Text
                className={text}
                variant={{ size: "base", weight: "bold", color: "contrast" }}
              >
                {room.name}
              </Text>
              <Text
                className={text}
                variant={{
                  size: "base",
                  weight: "semibold",
                  color: "secondary",
                }}
              >
                {formatRoomPrice(room)}
              </Text>
            </div>
          ),
        }))}
        value={selectedItemId}
        onValueChange={handleSelectedItemChange}
        onItemBlur={handleItemBlur}
      />
    </div>
  );
}

export default ItemList;
