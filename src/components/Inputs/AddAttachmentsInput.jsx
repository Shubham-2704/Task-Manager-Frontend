import React, { useState } from "react";
import { Paperclip, Plus, Trash2 } from "lucide-react";

import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
  InputGroupText,
  InputGroupTextarea,
} from "@/components/ui/input-group";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

const AddAttachmentsInput = ({ attachments, setAttachments }) => {
  const [option, setOption] = useState("");

  const handleAddOption = () => {
    if (option.trim()) {
      setAttachments([...attachments, option.trim()]);
      setOption("");
    }
  };

  const handleDeleteOption = (index) => {
    const updatedOptions = attachments.filter((_, i) => i !== index);
    setAttachments(updatedOptions);
  };

  return (
    <div className="space-y-3">
      {attachments.map((item, index) => (
        <div
          key={item}
          className="flex justify-between bg-gray-50 border border-gray-100 px-3 py-1 rounded-md"
        >
          <Label>
            <Paperclip className="text-gray-400 size-[16px]" />
            {item}
          </Label>

          <Button
            variant={"ghost"}
            onClick={() => handleDeleteOption(index)}
            className="cursor-pointer"
          >
            <Trash2 className="size-[18px] text-red-500" />
          </Button>
        </div>
      ))}

      <div className="flex gap-2 md:gap-4 items-center">
        <InputGroup>
          <InputGroupInput
            placeholder="Add Attachments"
            value={option}
            onChange={(e) => setOption(e.target.value)}
          />
          <InputGroupAddon align="inline-start">
            <Paperclip />
          </InputGroupAddon>
        </InputGroup>

        <Button
          type="button"
          variant={"ghost"}
          onClick={handleAddOption}
          className="bg-gray-50 hover:bg-blue-50 cursor-pointer border border-gray-200/50 hover:border-blue-200/50 hover:text-primary"
        >
          <Plus className="size-[18px]" /> Add
        </Button>
      </div>
    </div>
  );
};

export default AddAttachmentsInput;
