import Link from "next/link";

export default function MainPage() {
  return (
    <div className="flex justify-center">
      <Link href="/wishlistItems/new" className="bg-pink-500 p-2 rounded-sm">
        Create event
      </Link>
    </div>
  );
}
