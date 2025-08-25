import { createAvatar } from "@dicebear/core";
import { botttsNeutral, initials } from "@dicebear/collection";

interface Props {
  seed: string;
  variant: "botttsNeutral" | "initials";
}

export default function GeneratedAvatarUri({ seed, variant }: Props) {
  const avatar = createAvatar(
    variant === "botttsNeutral" ? botttsNeutral : initials,
    {
      seed,
      ...(variant === "initials" && {
        initials: { fontSize: 42, fontWeight: 500 },
      }),
    }
  );

  return avatar.toDataUri();
}
