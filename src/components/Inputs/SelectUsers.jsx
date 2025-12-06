import { API_PATHS } from "@/utils/apiPaths";
import axiosInstance from "@/utils/axiosInstance";
import React, { useEffect, useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import AvatarGroup from "../AvatarGroup";

const SelectUsers = ({ selectedUsers, setSelectedUsers, ariaInvalid }) => {
  const [openAssign, setOpenAssign] = useState(false);
  const [allUsers, setAllUsers] = useState([]);
  // const [tempSelectedUsers, setTempSelectedUsers] = useState([]);

  const getAllUsers = async () => {
    try {
      const response = await axiosInstance.get(API_PATHS.USERS.GET_ALL_USERS);
      if (response.data?.length > 0) {
        setAllUsers(response.data);
      }
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const selectedUserAvatars = allUsers
    .filter((user) => selectedUsers.includes(user._id))
    .map((user) => user.profileImageUrl);

  useEffect(() => {
    getAllUsers();
  }, []);

  return (
    <div>
      <Dialog open={openAssign} onOpenChange={setOpenAssign}>
        <DialogTrigger asChild>
          {selectedUserAvatars.length === 0 ? (
            <Button
              variant="outline"
              className="w-full justify-start font-normal cursor-pointer"
              aria-invalid={ariaInvalid}
            >
              <Users /> Add Members
            </Button>
          ) : (
            <div className="cursor-pointer">
              <AvatarGroup avatars={selectedUserAvatars} maxVisible={3} />
            </div>
          )}
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Assign Users to Task</DialogTitle>
            <DialogDescription>
              Select users who will be assigned to this task.
            </DialogDescription>
          </DialogHeader>
          {allUsers.length === 0 ? (
            <p className="text-center">No users found.</p>
          ) : (
            allUsers.map((user) => (
              <div
                key={user._id}
                className="flex items-center gap-4 p-3 border-b border-gray-200"
              >
                <Avatar className="w-10 h-10">
                  <AvatarImage
                    src={user.profileImageUrl}
                    className="object-cover rounded-full"
                  />
                  <AvatarFallback>{user.name[0]}</AvatarFallback>
                </Avatar>

                <div className="flex-1">
                  <Label className="text-base">{user.name}</Label>
                  <p className="text-[13px] text-gray-500">{user.email}</p>
                </div>

                <Checkbox
                  name={selectedUsers}
                  // aria-invalid={false}
                  checked={selectedUsers.includes(user._id)}
                  onCheckedChange={(checked) => {
                    if (checked) {
                      setSelectedUsers([...selectedUsers, user._id]);
                    } else {
                      setSelectedUsers(
                        selectedUsers.filter((id) => id !== user._id)
                      );
                    }
                  }}
                />
              </div>
            ))
          )}
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline" className="cursor-pointer">
                Cancel
              </Button>
            </DialogClose>
            <Button
              type="submit"
              className="cursor-pointer"
              onClick={() => setOpenAssign(false)}
            >
              Done
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SelectUsers;
