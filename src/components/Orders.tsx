import {
  Grid,
  GridColumn as Column,
  GridPageChangeEvent,
} from "@progress/kendo-react-grid";
import { useEffect, useState } from "react";
import { PagerTargetEvent } from "@progress/kendo-react-data-tools";
import { OrdersList } from "../services/dummyData";
import { Input } from "@progress/kendo-react-inputs";

const initialDataState: PageState = { skip: 0, take: 10 };

interface PageState {
  skip: number;
  take: number;
}

interface order {
  orderId: string;
  vendorName: string;
  pickUpDate: string;
  status: string;
}

export default function Orders() {
  const [page, setPage] = useState<PageState>(initialDataState);
  //   TODO: we can create a dummy api call to set orders values
  const [orders, setOrders] = useState<order[]>(OrdersList || []);
  const [searchValue, setSearchValue] = useState<string>("");
  const [pageSizeValue, setPageSizeValue] =
    useState<number | string | undefined>();

  const pageChange = (event: GridPageChangeEvent) => {
    console.log(event);
    const targetEvent = event.targetEvent as PagerTargetEvent;
    const take = targetEvent.value === "All" ? orders?.length : event.page.take;
    if (targetEvent.value) {
      setPageSizeValue(targetEvent.value);
    }
    setPage({
      ...event.page,
      take,
    });
  };

  const filterChange = (event: any) => {
    // TODO: debounce function is misssing --Added
    setSearchValue(event?.value);
  };

  //   TODO: this can be further converted to custom hok on common level
  useEffect(() => {
    const getData = setTimeout(() => {
      // TODO: better approazch is to compare all values and not keys, but this approach reduces complexity  from n*n to n
      const data = OrdersList?.filter((x: any) => {
        return JSON.stringify(x)
          ?.toLowerCase()
          .match(searchValue?.toLowerCase());
      });
      setOrders(data);
    }, 200);
    return () => clearTimeout(getData);
  }, [searchValue]);

  return (
    <div className='container mt-4'>
      <Input label='search' onChange={filterChange} />
      <Grid
        pageable={{
          buttonCount: 4,
          pageSizes: [5, 10, 15, "All"],
          pageSizeValue: pageSizeValue,
        }}
        className={"mt-4"}
        skip={page.skip}
        take={page.take}
        total={orders.length}
        onPageChange={pageChange}
        filterable={true}
        data={orders.slice(page.skip, page.take + page.skip)}>
        <Column field='orderId' title='Order Id' />
        <Column field='vendorName' title='Vendor name' />
        {/* Ideally it should be in date format but the website from where we generated data have stringified it, to format this string we might need to parse it tp date and then format it with custom cell */}
        <Column field='pickUpDate' title='Pick up date' />
        <Column field='status' title='Status' />
      </Grid>
    </div>
  );
}
