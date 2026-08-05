import { Card, Select } from "@/shared/components/ui";

import { MESSAGING_OPTIONS } from "../../constants/profile.constants";
import type { MessagingOption } from "../../types/profile.types";

export interface MessagingSectionProps {
  messaging: MessagingOption;
  onChange: (value: MessagingOption) => void;
}

export function MessagingSection({ messaging, onChange }: MessagingSectionProps) {
  return (
    <Card>
      <h2 className="text-sm font-semibold text-text">Messaging</h2>
      <p className="mt-1 text-xs text-text-muted">
        Choose who can send you direct messages.
      </p>
      <Select
        id="settings-messaging"
        containerClassName="mt-4 max-w-sm"
        options={MESSAGING_OPTIONS}
        value={messaging}
        onChange={(e) => onChange(e.target.value as MessagingOption)}
      />
    </Card>
  );
}
