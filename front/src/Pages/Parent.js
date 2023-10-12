'use client';
import { Table, DarkThemeToggle, Flowbite, Footer, Pagination } from 'flowbite-react';
import './Parent.css'
import { useState, useEffect } from 'react';

export default function Parent() {
    const [currentPage, setCurrentPage] = useState(1);
    const [totalNum, setTotalNum] = useState(1);
    const [parent, setParent] = useState([]);
    const onPageChange = (page) => {
        console.log(page)
        setCurrentPage(page);
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:8080/parent/counter');
                const jsonData = await response.json();
                setTotalNum(Math.round(jsonData.data / 2));
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();

    }, [])

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`http://localhost:8080/parent/page=${currentPage}`);
                const jsonData = await response.json();
                setParent(jsonData.data);
                console.log(parent);
            }
            catch (error) {
                console.error(error);
            }
        };
        fetchData();

    }, [currentPage])

    const make_table = () => {
        const rows = parent.map((row) => {
            console.log(row)
            return (
                <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                    <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                        {row.id}
                    </Table.Cell>
                    <Table.Cell>
                        {row.sender}
                    </Table.Cell>
                    <Table.Cell>
                        {row.receiver}
                    </Table.Cell>
                    <Table.Cell>
                        {row.totalAmount}
                    </Table.Cell>
                    <Table.Cell>
                        <a
                            className="font-medium text-cyan-600 hover:underline dark:text-cyan-500"
                            href={`/detail/${row.id}`}
                        >
                            <p>
                                {row.totalPaid}
                            </p>
                        </a>
                    </Table.Cell>
                </Table.Row>
            )
        })
        return rows;
    }

    return (
        <div className='main'>
            <Flowbite>

                <DarkThemeToggle />
                <Table hoverable>
                    <Table.Head>
                        <Table.HeadCell>
                            ID
                        </Table.HeadCell>
                        <Table.HeadCell>
                            Sender
                        </Table.HeadCell>
                        <Table.HeadCell>
                            Receiver
                        </Table.HeadCell>
                        <Table.HeadCell>
                            Total Amount
                        </Table.HeadCell>
                        <Table.HeadCell>
                            Total Paid Amount
                        </Table.HeadCell>
                    </Table.Head>
                    <Table.Body className="divide-y">
                        {make_table()}
                    </Table.Body>
                </Table>

            </Flowbite>
            <Pagination
                currentPage={currentPage}
                onPageChange={page => onPageChange(page)}
                totalPages={totalNum}
            />
        </div >
    )
}


