import { createContext } from 'react';

interface IReportQueueItem {
    key: string;
    reportFunc: () => void;
}
interface IReportContext {
    reportMap: Map<string, boolean>;
    reportQueue: Array<IReportQueueItem>;
}
export const ReportContext = createContext<IReportContext>(
    {} as IReportContext,
);
