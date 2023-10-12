'use client';
import { Table, DarkThemeToggle, Flowbite, Footer, Pagination } from 'flowbite-react';
import './Child.css'
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

export default function Child() {
    const [parent, setParent] = useState([]);
    const { id } = useParams();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`http://localhost:8080/parent/detail=${id}`);
                const jsonData = await response.json();
                setParent(jsonData.data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();

    }, [])


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
                        {row.paidAmount}
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
                            Paid Amount
                        </Table.HeadCell>
                    </Table.Head>
                    <Table.Body className="divide-y">
                        {make_table()}
                    </Table.Body>
                </Table>

            </Flowbite>

        </div >
    )
}


