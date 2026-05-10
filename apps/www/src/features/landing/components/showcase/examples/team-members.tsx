"use client";

import { useState, useMemo, useReducer } from "react";
import { List, Group, Select, Badge, Divider, Button } from "ui-lab-components";
import { FaEnvelope, FaMagnifyingGlass, FaGear, FaUsers, FaArrowTurnUp } from "react-icons/fa6";

interface Member {
  name: string;
  email: string;
  initials: string;
  role: string;
}

const ROLES = ["Owner", "Admin", "Member", "Viewer"];

const INITIAL_MEMBERS: Member[] = [
  { name: "Sophie Chen", email: "sc@acme.com", initials: "SC", role: "Admin" },
  { name: "Marcus Rivera", email: "mr@acme.com", initials: "MR", role: "Member" },
  { name: "Jaya Patel", email: "jp@acme.com", initials: "JP", role: "Viewer" },
];

const PENDING_INVITE = { email: "alex@relay.so", role: "Member", sentAt: "2h ago" };

type State = {
  members: Member[];
  search: string;
  roleFilter: string;
  inviteEmail: string;
  inviteRole: string;
};

type Action =
  | { type: 'SET_ROLE'; index: number; role: string }
  | { type: 'SET_SEARCH'; value: string }
  | { type: 'SET_ROLE_FILTER'; value: string }
  | { type: 'SET_INVITE_EMAIL'; value: string }
  | { type: 'SET_INVITE_ROLE'; value: string };

function memberReducer(state: State, action: Action): State {
  switch (action.type) {
    case 'SET_ROLE':
      return { ...state, members: state.members.map((m, i) => i === action.index ? { ...m, role: action.role } : m) };
    case 'SET_SEARCH':
      return { ...state, search: action.value };
    case 'SET_ROLE_FILTER':
      return { ...state, roleFilter: action.value };
    case 'SET_INVITE_EMAIL':
      return { ...state, inviteEmail: action.value };
    case 'SET_INVITE_ROLE':
      return { ...state, inviteRole: action.value };
    default:
      return state;
  }
}

export function MemberRolePanel() {
  const [state, dispatch] = useReducer(memberReducer, {
    members: INITIAL_MEMBERS,
    search: "",
    roleFilter: "all",
    inviteEmail: "",
    inviteRole: "Member",
  });
  const { members, search, roleFilter, inviteEmail, inviteRole } = state;

  const filtered = useMemo(() => {
    return members.filter((m) => {
      const matchesSearch =
        search === "" ||
        m.name.toLowerCase().includes(search.toLowerCase()) ||
        m.email.toLowerCase().includes(search.toLowerCase());
      const matchesRole = roleFilter === "all" || m.role === roleFilter;
      return matchesSearch && matchesRole;
    });
  }, [members, search, roleFilter]);

  function setRole(index: number, role: string | number | null) {
    if (!role) return;
    dispatch({ type: 'SET_ROLE', index, role: String(role) });
  }

  return (
    <div className="h-fit w-full bg-background-200 border border-background-700 rounded-sm overflow-hidden">

      {/* Header */}
      <div className="px-4 pt-3.5 pb-3 border-b border-background-700 flex justify-between">
        <div className="flex items-center gap-2">
          <FaUsers size={20} className="mr-2" />
          <span className="text-sm font-semibold text-foreground-100">Team Members</span>
          <span className="text-sm text-foreground-500">{members.length} members</span>
        </div>
      </div>

      {/* Search/filter toolbar */}
      <div className="px-2 gap-2 flex items-center justify-between py-2 w-full border-b border-background-700">
        <Group className="h-10.5">
          <Group.Input
            placeholder="Search members..."
            icon={<FaMagnifyingGlass />}
            className="w-[220px]"
            value={search}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => dispatch({ type: 'SET_SEARCH', value: e.target.value })}
          />
          <Divider />
          <Group.Select
            selectedKey={roleFilter}
            onSelectionChange={(key) => dispatch({ type: 'SET_ROLE_FILTER', value: String(key) })}
            className="flex-none"
          >
            <Select.Trigger className="bg-background-900">
              {roleFilter === "all" ? "All Roles" : roleFilter}
            </Select.Trigger>
            <Select.Content>
              <Select.List>
                <Select.Item key="all" value="all" textValue="All Roles">All Roles</Select.Item>
                {ROLES.map((role) => (
                  <Select.Item key={role} value={role} textValue={role}>{role}</Select.Item>
                ))}
              </Select.List>
            </Select.Content>
          </Group.Select>
        </Group>
        <Button variant="ghost" className="text-foreground-400 w-10 h-10 p-0 ">
          <FaGear />
        </Button>
      </div>

      {/* Member list */}
      <List items={filtered} spacing="default" className="max-w-none">
        {filtered.map((member, i) => {
          const originalIndex = members.indexOf(member);
          return (
            <div key={member.email} className="group">
              <List.Item value={member.email} className="px-4 py-3">
                <List.Media>
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold text-foreground-300 bg-background-800 shrink-0"
                  >
                    {member.initials}
                  </div>
                </List.Media>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5">
                    <span className="text-sm font-medium text-foreground-100 truncate">{member.name}</span>
                  </div>
                  <List.Desc>{member.email}</List.Desc>
                </div>

                <Select
                  selectedKey={member.role}
                  onSelectionChange={(key) => setRole(originalIndex, key)}
                  className="w-[108px] flex-none"
                >
                  <Select.Trigger variant="ghost">
                    {member.role}
                  </Select.Trigger>
                  <Select.Content>
                    <Select.List>
                      {ROLES.map((role) => (
                        <Select.Item key={role} value={role} textValue={role}>{role}</Select.Item>
                      ))}
                    </Select.List>
                  </Select.Content>
                </Select>
              </List.Item>
              {i < filtered.length - 1 && <List.Divider spacing="none" />}
            </div>
          );
        })}

        {/* Pending invite row — inside List for context, excluded from items array */}
        <List.Divider spacing="none" />
        <List.Item value="pending-alex" className="px-4 py-3">
          <List.Media>
            <div className="w-8 h-8 rounded-full bg-background-700 flex items-center justify-center shrink-0">
              <FaEnvelope className="w-3.5 h-3.5 text-foreground-500" />
            </div>
          </List.Media>
          <div className="flex-1 min-w-0">
            <span className="text-sm text-foreground-400 truncate block">{PENDING_INVITE.email}</span>
            <List.Desc>Invite sent {PENDING_INVITE.sentAt}</List.Desc>
          </div>
          <Badge size="sm" variant="default">Pending</Badge>
        </List.Item>
      </List>

      {/* Invite footer */}
      <div className="p-2 border-t border-background-700">
        <Group orientation="horizontal" className="h-12" spacing="sm">
          <Group.Input
            placeholder="Email address..."
            className="flex-1"
            icon={<FaEnvelope />}
            value={inviteEmail}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => dispatch({ type: 'SET_INVITE_EMAIL', value: e.target.value })}
          />
          <Divider orientation="vertical" />
          <Group.Select
            selectedKey={inviteRole}
            onSelectionChange={(key) => dispatch({ type: 'SET_INVITE_ROLE', value: String(key) })}
            className="w-[110px] flex-none"
          >
            <Select.Trigger variant="ghost">
              {inviteRole}
            </Select.Trigger>
            <Select.Content>
              <Select.List>
                {["Admin", "Member", "Viewer"].map((role) => (
                  <Select.Item key={role} value={role} textValue={role}>{role}</Select.Item>
                ))}
              </Select.List>
            </Select.Content>
          </Group.Select>
          <Group.Button className="gap-4" variant="default" icon={{ right: <FaArrowTurnUp className="rotate-90 w-12" /> }} size="sm">Invite</Group.Button>
        </Group>
      </div>
    </div>
  );
}
