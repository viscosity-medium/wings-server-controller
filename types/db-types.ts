export interface LogDataToDbProps {
    ip: string,
    id: string,
    command: string,
    date: string,
    time: string,
}

export type LogDataToDb = (props: LogDataToDbProps) => void