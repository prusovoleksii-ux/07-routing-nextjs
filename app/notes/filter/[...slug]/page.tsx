import { HydrationBoundary, QueryClient, dehydrate } from "@tanstack/react-query";
import NotesClient from "./Notes.client";
import { fetchNotesFiltered } from "@/lib/api";

type Props = {
  params: Promise<{ slug?: string[] }>;
};

export default async function NotesPage({ params }: Props) {
  const { slug } = await params;
  const category = slug?.[0] && slug[0] !== "all" ? slug[0] : undefined;

  const queryClient = new QueryClient();

  // Prefetch initial state: empty search, page 1, optionally filtered by category
  await queryClient.prefetchQuery({
    queryKey: ["notes", "", 1, category],
    queryFn: () => fetchNotesFiltered("", 1, category),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient category={category} />
    </HydrationBoundary>
  );
}
