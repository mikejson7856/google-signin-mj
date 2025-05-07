import { TableCellsSplit } from 'lucide-react';
export default function Home() {
  return (
    <div className="flex gap-5 justify-center items-center bg-amber-200 min-h-screen">
      <TableCellsSplit size={30}/>
      <p className="text-xl">Google Signin</p>
    </div>
  );
}
