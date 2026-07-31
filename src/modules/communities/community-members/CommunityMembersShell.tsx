"use client";

import { useState } from "react";
import { SearchInput, LoadMoreButton } from "@/modules/communities/shared/components/ui";
import { MemberListItem } from "./components/MemberListItem";
import { Member } from "./types";

interface CommunityMembersShellProps {
  members: Member[];
  hasMore?: boolean;
  onLoadMore?: () => void;
  onMemberMenuClick?: (id: string) => void;
}

export function CommunityMembersShell({
  members,
  hasMore = false,
  onLoadMore,
  onMemberMenuClick,
}: CommunityMembersShellProps) {
  // Visual-only for now — real filtering will query the API by search term.
  const [searchValue, setSearchValue] = useState("");

  return (
    <div>
      <SearchInput
        value={searchValue}
        onChange={setSearchValue}
        placeholder="Search members…"
        className="mb-4"
      />
      <div className="space-y-2.5">
        {members.map((member) => (
          <MemberListItem key={member.id} member={member} onMenuClick={onMemberMenuClick} />
        ))}
      </div>
      {hasMore && <LoadMoreButton onClick={() => onLoadMore?.()} />}
    </div>
  );
}