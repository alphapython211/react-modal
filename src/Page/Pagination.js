import React,
{
    useState,
    useEffect
} from 'react';
import GetData from './GetData';

function Pagination() {
    const [page, setPage] = useState(1);
    const [numberOfPages, setNumberOfPages] = useState(0);
    const [data, setData] = useState([]);

    useEffect(() => {
        GetData(page)
            .then(response => {
                setData(response.data);
                setNumberOfPages(response.totalPages);
            });
    }, [page, numberOfPages]);
    const nextPage = () => {
        setPage(pageNo => pageNo + 1);
    };

    const prevPage = () => {
        setPage(pageNo => pageNo - 1);
    };

    return (
        <div className='container'>
            <div className='list-item'
                style={
                    {
                        fontWeight: 'bold',
                        backgroundColor: 'lightgray'
                    }}>
                <span className='list-item-span1'>
                    Item Name
                </span>
                <span className='list-item-span2'>
                    Item ID
                </span>
            </div>
            {
                data && data.map(item => (
                    <div key={item.id} className='list-item'>
                        <span className='list-item-span1'>
                            {item.name}
                        </span>
                        <span className='list-item-span2'>
                            {item.id}
                        </span>
                    </div>
                ))
            }
            <button onClick={prevPage}
                disabled={page === 1}>
                Prev
            </button>
            <button onClick={nextPage}
                disabled={page === numberOfPages}>
                Next
            </button>
        </div>
    );
}

export default Pagination;