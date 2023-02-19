import { useEffect, useState } from 'react';
import {
    createStyles,
    Table,
    ScrollArea,
    UnstyledButton,
    Group,
    Text,
    Center,
    Button
} from '@mantine/core';
import { IconX } from '@tabler/icons';
import React from 'react';
import { IconCheck } from '@tabler/icons-react';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';

const useStyles = createStyles((theme) => ({
    th: {
        padding: '0 !important',
    },

    control: {
        width: '100%',
        padding: `${theme.spacing.xs}px ${theme.spacing.md}px`,

    '&:hover': {
        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
    },
    },

    icon: {
        width: 21,
        height: 21,
        borderRadius: 21,
    },
}));

interface RowData {
    id: string,
    title: string[],
    ISBN: string[],
    amount: string,
    user: string
}

interface ThProps {
    children: React.ReactNode;
    w? : string
}

function Th({ children, w }: ThProps) {
    const { classes } = useStyles();
    return (
    <th className={classes.th} style = {{ width : w }} >
        <UnstyledButton className={classes.control}>
        <Group position="apart">
            <Text weight={500} size="sm">
            {children}
            </Text>
            <Center className={classes.icon}>
            </Center>
        </Group>
        </UnstyledButton>
    </th>
    );
}

export const RequestOrder = () => {
    const axiosPrivate = useAxiosPrivate();
    const [data, setData] = useState<RowData[]>([]);

    useEffect( () => {
        axiosPrivate.get('/order/all').then(res => setData(res.data));
    }, [])

    const handleApprove = (id: string) => {
        axiosPrivate.get(`/order/${id}/approve`).then(res => {
            setData((prev) => {
                return prev.filter( item => item.id != id);
            })
        })
    }

    const handleDiscard = (id: string) => {
        axiosPrivate.get(`/order/${id}/discard`).then(res => {
            console.log(res.data);
        });
    }

    const rows = data.map((row, index) => {
        console.log(row);
        return (
            <tr key={row.id}>
                <td>{index + 1}</td>
                <td>{row.title.map( item => <>{item}<br/></> )}</td>
                <td>{row.ISBN.map( item => <>{item}<br/></> )}</td>
                <td>{row.amount}</td>
                <td>{row.user}</td>
                <td>
                    <Button 
                        leftIcon={<IconCheck/>} 
                        style={{marginRight:"4px"}} 
                        color="green" 
                        onClick={() => {handleApprove(row.id)}}>
                            Approve
                    </Button>
                    <Button 
                        leftIcon={<IconX/>} 
                        onClick={() => handleDiscard(row.id)} 
                        color="red">
                            Discard
                    </Button>
                </td>
            </tr>
        )
    });

return (
    <ScrollArea>
    <Table
        horizontalSpacing="md"
        verticalSpacing="xs"
        sx={{  minWidth: 700 }}
        striped
        highlightOnHover
        withBorder 
        withColumnBorders
    >
        <thead>
            <tr>
                <Th w='110px' > index </Th>
                <Th> Title </Th>
                <Th> ISBN </Th>
                <Th> Amount </Th>
                <Th> User </Th>
                <Th w = '300px'> Action </Th>
            </tr>
        </thead>
        <tbody>
            {rows.length > 0 ? (
                rows
                ) : (
                <tr>
                    <td colSpan={6}>
                    <Text weight={500} align="center">
                        Nothing found
                    </Text>
                    </td>
                </tr>
            )}
        </tbody>
    </Table>
    </ScrollArea>
    );
}