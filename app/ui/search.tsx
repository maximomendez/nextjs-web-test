'use client'; //This is a Client Component, which means you can use event listeners and hooks
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { useSearchParams, usePathname, useRouter} from 'next/navigation'; //To update the url
import { useDebouncedCallback } from 'use-debounce';

//Debouncing is a programming practice that limits the rate at which a function can fire. In our case, you only want to query the database when the user has stopped typing.

export default function Search({ placeholder }: { placeholder: string }) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  //This function will wrap the contents of handleSearch, and only run the code after a specific time once the user has stopped typing (300ms)
  const handleSearch = useDebouncedCallback((term) => {
    //URLSearchParams is a Web API that provides utility methods for manipulating the URL query parameters
    const params = new URLSearchParams(searchParams);
    params.set('page', '1'); //Get into the page 1
    if (term) {
      params.set('query', term);
    } else {
      params.delete('query');
    }
    //pathname is the current path, in your case, "/dashboard/invoices".
    //updates the URL with the user's search data (/dashboard/invoices?query=lee)
    replace(`${pathname}?${params.toString()}`);
  }, 500)
  
  return (
    <div className="relative flex flex-1 flex-shrink-0">
      <label htmlFor="search" className="sr-only">
        Search
      </label>
      <input
        className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
        placeholder={placeholder}
        onChange={(e)=>handleSearch(e.target.value)}
        defaultValue={searchParams.get('query')?.toString()} //Have connected url query param to input value
      />
      <MagnifyingGlassIcon className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
    </div>
  );
}
