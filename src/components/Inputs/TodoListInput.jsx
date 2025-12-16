import React, { useState } from "react";
import { Plus, Trash, Trash2 } from "lucide-react";

import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const TodoListInput = ({ todoList, setTodoList, ariaInvalid }) => {
  const [option, setOption] = useState("");

  // Function to handle adding an option
  const handleAddOption = () => {
    if (option.trim()) {
      setTodoList([...todoList, option.trim()]);
      setOption("");
    }
  };

  // Function to handle deleting an option
  const handleDeleteOption = (index) => {
    const updatedOptions = todoList.filter((_, i) => i !== index);
    setTodoList(updatedOptions);
  };

  return (
    <div className="space-y-3">
      {todoList.map((item, index) => (
        <div
          key={item}
          className="flex justify-between bg-gray-50 border border-gray-100 dark:bg-gray-800 dark:border-gray-700 px-3 py-1 rounded-md"
        >
          <Label>
            <span className="text-gray-400 dark:text-white font-semibold">
              {index < 9 ? `0${index + 1}` : index + 1}
            </span>
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

      <div className="flex items-center gap-2 md:gap-4">
        <Input
          placeholder="Enter Task"
          value={option}
          onChange={(e) => setOption(e.target.value)}
          aria-invalid={ariaInvalid}
        />
        <Button
          type="button"
          variant={"ghost"}
          onClick={handleAddOption}
          className="bg-gray-50 dark:bg-gray-800 hover:bg-blue-50 cursor-pointer border border-gray-200/50 hover:border-blue-200/50 hover:text-primary dark:text-secondary-foreground"
        >
          <Plus className="size-[18px]" /> Add
        </Button>
      </div>
    </div>
  );
};

export default TodoListInput;
