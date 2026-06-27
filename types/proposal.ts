export type Proposal = {
  id: number;
  event_id: number;
  item_id: number;
  proposed_by: number;
};

export const RATINGS: Record<number, string> = {
  1: "rating_1",
  2: "rating_2",
  3: "rating_3",
  4: "rating_4",
  5: "rating_5",
};

export type ProposalRating = {
  user_id: number;
  proposal_id: number;
  rating: number;
};

export type ProposalVote = {
  user_id: number;
  proposal_id: number;
  approved: boolean;
};
