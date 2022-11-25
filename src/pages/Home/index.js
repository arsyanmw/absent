import React, {useEffect, useMemo, useState} from "react";
import { db } from "../../config/firebase";
import { collection, addDoc, getDocs, Timestamp, query, where, orderBy } from "firebase/firestore";
import moment from "moment/moment";
import {formatCurrenyID} from "../../helpers/common";
import {FAB} from "../../components";

const Home = () => {
    const [form, setForm] = useState({
        name: 'Arsyan',
        date: moment().format("YYYY-MM-DD"),
    });
    const [logData, setLogData] = useState([]);
    const [income, setIncome] = useState(0);
    const [isFetch, setIsFetch] = useState(true);

    const dateDataByLog = useMemo(() => {
        return Object.keys(logData).map(v => logData[v].date);
    }, [logData])

    const handleMasuk = async () => {
        const data = {
            name: form.name,
            date: form.date,
            created_at: Timestamp.now(),
        }

        try {
            await addDoc(collection(db, "c_absensi"), data);
            setIsFetch(true);
        } catch (e) {console.log(e);}
    }

    const handleChangeText = (e) => {
        setForm({
            ...form,
            name: e.target.value,
        });
    }

    const handleChangeDate = (e) => {
        setForm({
            ...form,
            date: moment(e.target.value).format('YYYY-MM-DD'),
        });
    }

    useEffect(() => {
        let arrData = [];
        const fetch = async () => {
            const startOfMonth = moment().startOf('month').format('YYYY-MM-DD');
            const endOfMonth = moment().endOf('month').format('YYYY-MM-DD');
            const absents = query(
                collection(db, "c_absensi"),
                where("date", ">=", startOfMonth),
                where("date", "<=", endOfMonth),
                orderBy("date", "desc"),
            );

            const querySnapshot = await getDocs(absents);
            querySnapshot.forEach((doc) => {
                const data = {
                    name: doc.data().name,
                    date: doc.data().date,
                    created_at: doc.data().created_at,
                }
                arrData.push(data);
            });
        }

        fetch().then(() => {
            setLogData(arrData);
            setIncome(arrData.length * 20000);
            setIsFetch(false);
        })
    }, [isFetch]);

    const handlePrint = () => {
        let date = '';

        date += moment(dateDataByLog[0]).locale('id').format('MMMM') + ' \n\n';
        dateDataByLog.map(v => {
            return date += moment(v).locale('id').format('dddd, DD MMMM YYYY') + ' \n';
        })

        const printDate = moment(dateDataByLog[0]).format('yyyy-MM-DD');
        const blobFile = new Blob([date], { type: "text/plain;charset=utf-8" });
        const url = URL.createObjectURL(blobFile);
        const element = document.createElement("a");
        element.download = `absen-${printDate}.txt`;
        element.href = url;
        element.click();
    }

    return (
        <>
            <div className="mx-auto p-6 w-full min-h-screen flex flex-col justify-center bg-fuchsia-200">
                <div className="relative xl:w-2/4 sm:w-4/4 md:w-4/4 mx-auto bg-white rounded-lg h-5/6 xl:h-fit">
                    {isFetch ? (
                        <div className="w-full h-full absolute flex flex-col justify-center items-center rounded-lg bg-slate-50/90">
                            <span className="text-2xl font-bold">LOADING...</span>
                        </div>
                    ) : null}
                    <div className="flex flex-col justify-center p-10 mx-auto shadow-lg">
                        <div className="flex justify-center xl:flex-row flex-col">
                            <input
                                type={'text'}
                                value={form.name}
                                onChange={handleChangeText}
                                className="text-center font-black outline-none focus:ring-2 hover:bg-slate-100 duration-500 rounded-md px-3 py-2 mx-2 my-2 xl:my-0 border border-slate-300 w-full"
                            />
                            <input
                                type={'date'}
                                value={form.date}
                                onChange={handleChangeDate}
                                className="text-center font-black outline-none focus:ring-2 hover:bg-slate-100 duration-500 rounded-md px-3 py-2 mx-2 my-2 xl:my-0 border border-slate-300 w-full"
                            />
                        </div>
                        <div className="flex justify-center p-2">
                            <button className="shadow rounded p-3 w-full bg-violet-50 hover:bg-violet-100 font-bold" onClick={() => handleMasuk()}>Log In</button>
                        </div>
                        <div className="flex justify-center px-2 py-7">
                            <table className="table-fixed border w-full">
                                <thead>
                                    <tr>
                                    <th className="border p-3">Nama</th>
                                    <th className="border p-3">Log In</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {logData.map((item, idx) => (
                                        <tr key={idx} className="hover:bg-slate-100">
                                            <td className="border text-center p-3">{item.name}</td>
                                            <td className="border text-right p-3">{moment(item.date).locale('id').format('dddd, DD MMMM YYYY')}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <div className="flex justify-center p-2">
                            <span className="italic text-lg font-bold">
                                You Will Earn <span className="font-bold bg-green-300 p-1">{formatCurrenyID(income)}</span> In This Month
                            </span>
                        </div>
                    </div>
                </div>
            </div>
            <FAB onClick={handlePrint} />
        </>
    );
};

export default Home;