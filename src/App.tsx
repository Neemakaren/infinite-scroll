import {useEffect, useState} from 'react'
import ItemCard from './components/ItemCard'
import { item } from './types/todo'
import { useInfiniteQuery } from '@tanstack/react-query'
import { useInView} from 'react-intersection-observer'



const App = () => {
  const { ref, inView } = useInView();
  const [items, setItems] = useState<item []>([])


  const fetchData =  async ({pageParam}: {pageParam: number}) => {
    const res = await fetch(`https://jsonplaceholder.typicode.com/todos?_page=${pageParam}`)
    return res.json(); 
  }


  const {data, status, error, fetchNextPage, isFetchingNextPage, hasNextPage} = useInfiniteQuery({
    queryKey: ['items'],
    queryFn: fetchData,
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      // return allPages.length + 1
      // return 20 + 1;
      const nextPage = lastPage.length ? allPages.length + 1 : undefined
      return nextPage
    }
  })


const content = data?.pages.map((items: item[]) => items.map((item, index) => {
  if (items.length == index + 1) {
    return  <ItemCard innerRef={ref} key={item.id} item={item}/>
  }
  return  <ItemCard key={item.id} item={item}/>
}))

useEffect(() => {
  if (inView && hasNextPage) {
    fetchNextPage();
  }
}, [inView, hasNextPage, fetchNextPage]);


if (status === 'pending') {
  return <p>Loading...</p>;
}

if (status === 'error') {
  return <p>Error: {error.message}</p>;
}
  

  return (
    <section>
      {content}
      {/* <button disabled={!hasNextPage || isFetchingNextPage} onClick={() => fetchNextPage()}>{isFetchingNextPage ? 'loading more...' : hasNextPage ?  'load more': 'nothing more to load'}</button> */}
      {isFetchingNextPage && <h3>Loading...</h3>}
    </section>
  )
}

export default App