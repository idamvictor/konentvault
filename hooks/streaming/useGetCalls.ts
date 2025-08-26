import { useEffect, useState } from "react";
// import { useUser } from "@clerk/nextjs";
import { Call, useStreamVideoClient } from "@stream-io/video-react-sdk";
// import { useUser } from "@/store/useUser";
import { useUserStore } from "@/store/use-user-store";

export const useGetCalls = () => {
  // const { user } = useUser();
  // const { user } = useUser();
  const { user } = useUserStore();
  const client = useStreamVideoClient();
  const [calls, setCalls] = useState<Call[]>();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const loadCalls = async () => {
      if (!client || !user?.id) return;

      setIsLoading(true);

      try {
        // https://getstream.io/video/docs/react/guides/querying-calls/#filters
        const { calls } = await client.queryCalls({
          sort: [{ field: "starts_at", direction: -1 }],
          filter_conditions: {
            starts_at: { $exists: true },
            $or: [
              { created_by_user_id: user.id.toString() },
              { members: { $in: [user.id.toString()] } },
            ],
          },
        });

        setCalls(calls);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    loadCalls();
  }, [client, user?.id]);

  const now = new Date();

  const endedCalls = calls?.filter(({ state: { startsAt, endedAt } }: Call) => {
    return (startsAt && new Date(startsAt) < now) || !!endedAt;
  });

  const upcomingCalls = calls?.filter(
    ({ state: { startsAt, endedAt } }: Call) => {
      return startsAt && new Date(startsAt) > now && !endedAt;
    }
  );

  return { endedCalls, upcomingCalls, callRecordings: calls, isLoading };
};
