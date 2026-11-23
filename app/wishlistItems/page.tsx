import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getAllWishlistItems } from "@/services/wishlistItem";
import { WishlistItem } from "@/types/wishlist-item";

const WishlistItemPage = async () => {
  const allItems: WishlistItem[] =
    (await getAllWishlistItems()) as WishlistItem[];
  console.log(allItems);

  const rows = allItems.map((item: WishlistItem) => (
    <TableRow key={item.id}>
      <TableCell>{item.name}</TableCell>
      <TableCell>{item.location}</TableCell>
      <TableCell>{item.created_at.toLocaleDateString()}</TableCell>
      <TableCell>{item.added_by_user}</TableCell>
    </TableRow>
  ));

  return (
    <div className="flex justify-center">
      <div>
        <h1>Wishlist</h1>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Created At</TableHead>
              <TableHead>Added by</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>{rows}</TableBody>
        </Table>
      </div>
    </div>
  );
};

export default WishlistItemPage;
