// get all the calls

import { useUser } from "@clerk/nextjs";
import { Call, useStreamVideoClient } from "@stream-io/video-react-sdk";
import { useEffect, useState } from "react";

export const useGetCalls = () => {
  const [calls, setCalls] = useState<Call[]>([]);
  const [isCallLoading, setIsCallLoading] = useState(false);

  const client = useStreamVideoClient();
  const { user } = useUser();

  useEffect(() => {
    if (!client || !user?.id) return;
    setIsCallLoading(true);

    const loadCalls = async () => {
      try {
        const { calls } = await client.queryCalls({
          sort: [{ field: "starts_at", direction: -1 }],
          filter_conditions: {
            starts_at: {
              $exists: true,
            },
            $or: [
              { created_by_user_id: user?.id },
              { members: { $in: [user?.id] } },
            ],
          },
        });

        setCalls(calls);
      } catch (error) {
        console.error(error);
      } finally {
        setIsCallLoading(false);
      }
    };
    loadCalls();
  }, [client, user?.id]);

  const nowTime = new Date();

  //   return all that could be required from fetched calls
  const endedCalls = calls.filter(({ state: { startsAt, endedAt } }: Call) => {
    return (startsAt && nowTime > new Date(startsAt)) || !!endedAt;
  });
  const upcomingCalls = calls.filter(({ state: { startsAt } }: Call) => {
    return startsAt && nowTime < new Date(startsAt);
  });

  return {
    endedCalls,
    upcomingCalls,
    callRecordings: calls,
    isCallLoading,
  };
};
