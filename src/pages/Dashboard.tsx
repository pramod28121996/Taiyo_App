import React, { useEffect, useState } from "react";
import SideBar from "../components/Sidebar";
import { useQuery } from "react-query";
import DashboardService from "../services/DashboardService";
import WorldWideCasesType from "../types/DashboardTypes/WorldWideCasesType";

import HistoricalCasesType from "../types/DashboardTypes/HistoricalCasesType";
import moment from "moment";
import LineChart from "../components/LineChart";
import VerticalBarChart from "../components/VerticalBarChart";
import { CountriesCasesType } from "../types/DashboardTypes/CountriesCasesType";
import PieChart from "../components/PieChart";

export type Props = {};

const Dashboard: React.FC<Props> = ({}) => {
  const [getResult, setGetResult] = useState<WorldWideCasesType | null>();
  const [getHistoricalResult, setHistoricalResult] = useState<any | null>();
  const [getSelectedCounty, setSelectedCounty] =
    useState<string>("Afghanistan");
  const [getCountriesCasesResult, setCountriesCasesResult] = useState<
    any | null
  >();

  const { isLoading: isLoadingData, refetch: getAllWorldWideCases } = useQuery<
    WorldWideCasesType,
    Error
  >(
    "query-world-wide-cases",
    async () => {
      return await DashboardService.GetAllWorldWideCasesData();
    },
    {
      enabled: false,
      onSuccess: (res: WorldWideCasesType) => {
        setGetResult(res);
      },
      onError: (err: any) => {
        console.log(err.response?.data || err);
      },
    }
  );

  const {
    isLoading: isLoadingHistoricalData,
    refetch: getHistoricalCasesData,
  } = useQuery<HistoricalCasesType, Error>(
    "query-historical-cases",
    async () => {
      return await DashboardService.GetHistoricalCasesData();
    },
    {
      enabled: false,
      onSuccess: (res: HistoricalCasesType) => {
        let lineGraphData = [];
        let yearData = manipulateDateForLineGraph();
        let cases: any = {
          label: "Cases Report",
          data: yearData[0].map((month) => res.cases[month]),
          borderColor: "rgb(53, 162, 235)",
          backgroundColor: "rgb(53, 162, 235)",
        };
        lineGraphData.push(cases);
        let recovered: any = {
          label: "Recovered Report",
          data: yearData[0].map((month) => res.recovered[month]),
          borderColor: "rgb(16 161 60 / 50%)",
          backgroundColor: "rgb(16 161 60 / 50%)",
        };
        lineGraphData.push(recovered);
        let deaths: any = {
          label: "Deaths Report",
          data: yearData[1].map((month) => res.deaths[month]),
          borderColor: "rgb(255, 99, 132)",
          backgroundColor: "rgb(255, 99, 132)",
        };
        lineGraphData.push(deaths);
        setHistoricalResult(lineGraphData);
      },
      onError: (err: any) => {
        console.log(err.response?.data || err);
      },
    }
  );

  const { isLoading: isLoadingCountriesData, refetch: getCountriesCases } =
    useQuery<Array<CountriesCasesType>, Error>(
      "query-countries-cases",
      async () => {
        return await DashboardService.GetCountriesCasesData();
      },
      {
        enabled: false,
        onSuccess: (res: Array<CountriesCasesType>) => {
          const allCountries = res.map((countryInfo) => countryInfo.country);
          const countryData = res.find(
            (countryInfo) => countryInfo.country === getSelectedCounty
          );
          const data = {
            allCountries,
            res,
            countryFlag: countryData?.countryInfo?.flag,
            datasets: [
              {
                data: [
                  countryData?.cases,
                  countryData?.deaths,
                  countryData?.recovered,
                  countryData?.active,
                  countryData?.critical,
                  countryData?.casesPerOneMillion,
                  countryData?.deathsPerOneMillion,
                  countryData?.tests,
                  countryData?.population,
                ],
                backgroundColor: [
                  "rgba(255, 99, 132, 0.2)",
                  "rgba(54, 162, 235, 0.2)",
                  "rgba(255, 206, 86, 0.2)",
                  "rgba(75, 192, 192, 0.2)",
                  "rgba(153, 102, 255, 0.2)",
                  "rgba(255, 159, 64, 0.2)",
                  "rgba(75, 192, 192, 0.2)",
                  "rgba(153, 102, 255, 0.2)",
                  "rgba(255, 159, 64, 0.2)",
                ],
                borderColor: [
                  "rgba(255, 99, 132, 1)",
                  "rgba(54, 162, 235, 1)",
                  "rgba(255, 206, 86, 1)",
                  "rgba(75, 192, 192, 1)",
                  "rgba(153, 102, 125, 1)",
                  "rgba(76, 159, 64, 1)",
                  "rgba(75, 88, 30, 0.2)",
                  "rgba(153, 15, 255, 0.2)",
                  "rgba(10, 159, 64, 0.2)",
                ],
                borderWidth: 2,
              },
            ],
          };
          setCountriesCasesResult(data);
        },
        onError: (err: any) => {
          console.log(err.response?.data || err);
        },
      }
    );

  const manipulateDateForLineGraph = () => {
    let months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    let yearData = [
      {
        year: 2020,
        months: months,
      },
      {
        year: 2021,
        months: months,
      },
      {
        year: 2022,
        months: months,
      },
      {
        year: 2023,
        months: months,
      },
    ];
    return yearData.map((item) => {
      return item.months.map((month) => {
        return moment()
          .month(month)
          .year(item.year)
          .endOf("month")
          .format("M/DD/YY");
      });
    });
  };

  const handleCounty = (e: any) => {
    const { value } = e.target;
    const countryData = getCountriesCasesResult.res.find(
      (countryInfo: any) => countryInfo.country === value
    );
    const data = {
      ...getCountriesCasesResult,
      countryFlag: countryData?.countryInfo?.flag,
      datasets: [
        {
          data: [
            countryData?.cases,
            countryData?.deaths,
            countryData?.recovered,
            countryData?.active,
            countryData?.critical,
            countryData?.casesPerOneMillion,
            countryData?.deathsPerOneMillion,
            countryData?.tests,
            countryData?.population,
          ],
          backgroundColor: [
            "rgba(255, 99, 132, 0.2)",
            "rgba(54, 162, 235, 0.2)",
            "rgba(255, 206, 86, 0.2)",
            "rgba(75, 192, 192, 0.2)",
            "rgba(153, 102, 255, 0.2)",
            "rgba(255, 159, 64, 0.2)",
            "rgba(75, 192, 192, 0.2)",
            "rgba(153, 102, 255, 0.2)",
            "rgba(255, 159, 64, 0.2)",
          ],
          borderColor: [
            "rgba(255, 99, 132, 1)",
            "rgba(54, 162, 235, 1)",
            "rgba(255, 206, 86, 1)",
            "rgba(75, 192, 192, 1)",
            "rgba(153, 102, 125, 1)",
            "rgba(76, 159, 64, 1)",
            "rgba(75, 88, 30, 0.2)",
            "rgba(153, 15, 255, 0.2)",
            "rgba(10, 159, 64, 0.2)",
          ],
          borderWidth: 2,
        },
      ],
    };
    setSelectedCounty(value);
    setCountriesCasesResult(data);
  };
  useEffect(() => {
    getAllWorldWideCases();
    getHistoricalCasesData();
    getCountriesCases();
  }, []);

  useEffect(() => {}, [getSelectedCounty]);
  return (
    <>
      <SideBar />
      <div className="w-full p-10">
        <section>
          <div className="px-3">
            <h1 className="mb-4 text-2xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-5xl dark:text-white">
              <span className="underline underline-offset-3 decoration-8 decoration-blue-400 dark:decoration-blue-600">
                World Wide
              </span>{" "}
              Covid Cases
            </h1>
          </div>
          <div className="flex flex-wrap mb-2 text-center">
            <div className="w-full md:w-1/2 xl:w-1/3 pt-3 px-3 md:pr-2">
              <div className="bg-green-600 border rounded shadow p-2">
                <div className="flex flex-row items-center">
                  <div className="flex-shrink pl-1 pr-4">
                    <i className="fa fa-wallet fa-2x fa-fw fa-inverse"></i>
                  </div>
                  <div className="flex-1 text-right">
                    <h5 className="text-white">Total Recovered</h5>
                    <h3 className="text-white text-3xl">
                      {isLoadingData ? "Loading..." : getResult?.recovered}
                    </h3>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full md:w-1/2 xl:w-1/3 pt-3 px-3 md:pl-2">
              <div className="bg-blue-600 border rounded shadow p-2">
                <div className="flex flex-row items-center">
                  <div className="flex-shrink pl-1 pr-4">
                    <i className="fas fa-users fa-2x fa-fw fa-inverse"></i>
                  </div>
                  <div className="flex-1 text-right">
                    <h5 className="text-white">Total Cases</h5>
                    <h3 className="text-white text-3xl">
                      {isLoadingData ? "Loading..." : getResult?.cases}
                    </h3>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full md:w-1/2 xl:w-1/3 pt-3 px-3 md:pr-2 xl:pr-3 xl:pl-1">
              <div className="bg-orange-600 border rounded shadow p-2">
                <div className="flex flex-row items-center">
                  <div className="flex-shrink pl-1 pr-4">
                    <i className="fas fa-user-plus fa-2x fa-fw fa-inverse"></i>
                  </div>
                  <div className="flex-1 text-right pr-1">
                    <h5 className="text-white">Active Cases</h5>
                    <h3 className="text-white text-3xl">
                      {isLoadingData ? "Loading..." : getResult?.active}
                    </h3>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full md:w-1/2 xl:w-1/3 pt-3 px-3 md:pl-2 xl:pl-3 xl:pr-2">
              <div className="bg-purple-600 border rounded shadow p-2">
                <div className="flex flex-row items-center">
                  <div className="flex-shrink pl-1 pr-4">
                    <i className="fas fa-server fa-2x fa-fw fa-inverse"></i>
                  </div>
                  <div className="flex-1 text-right">
                    <h5 className="text-white">Critical Cases</h5>
                    <h3 className="text-white text-3xl">
                      {isLoadingData ? "Loading..." : getResult?.critical}
                    </h3>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full md:w-1/2 xl:w-1/3 pt-3 px-3 md:pr-2 xl:pl-2 xl:pr-3">
              <div className="bg-red-600 border rounded shadow p-2">
                <div className="flex flex-row items-center">
                  <div className="flex-shrink pl-1 pr-4">
                    <i className="fas fa-tasks fa-2x fa-fw fa-inverse"></i>
                  </div>
                  <div className="flex-1 text-right">
                    <h5 className="text-white">Total Deaths</h5>
                    <h3 className="text-white text-3xl">
                      {isLoadingData ? "Loading..." : getResult?.deaths}
                    </h3>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full md:w-1/2 xl:w-1/3 pt-3 px-3 md:pl-2 xl:pl-1">
              <div className="bg-pink-600 border rounded shadow p-2">
                <div className="flex flex-row items-center">
                  <div className="flex-shrink pl-1 pr-4">
                    <i className="fas fa-inbox fa-2x fa-fw fa-inverse"></i>
                  </div>
                  <div className="flex-1 text-right">
                    <h5 className="text-white">Tests Cases</h5>
                    <h3 className="text-white text-3xl">
                      {isLoadingData ? "Loading..." : getResult?.tests}
                    </h3>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section>
          <div className="px-3 pt-5">
            <h1 className="mb-4 text-2xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-5xl dark:text-white">
              <span className="underline underline-offset-3 decoration-8 decoration-blue-400 dark:decoration-blue-600">
                Historical
              </span>{" "}
              Covid Cases
            </h1>
          </div>
          {getHistoricalResult?.length > 0 && !isLoadingHistoricalData ? (
            <LineChart lineData={getHistoricalResult} />
          ) : (
            <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-blue-600 bg-blue-200 uppercase last:mr-0 mr-1">
              Chart Loading...
            </span>
          )}
        </section>

        <section>
          <div className="px-3 pt-5">
            <h1 className="mb-4 text-2xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-5xl dark:text-white">
              <span className="underline underline-offset-3 decoration-8 decoration-blue-400 dark:decoration-blue-600">
                County Wise
              </span>{" "}
              Covid Cases
            </h1>
          </div>
          <div className="grid grid-cols-2 gap-4 grid-flow-row grid-">
            <div className="p-5 text-center bg-white">
              <div className="relative border border-gray-300 text-gray-800 bg-white shadow-lg">
                <select
                  className="appearance-none w-full py-1 px-2 bg-white"
                  onChange={(e) => handleCounty(e)}
                  value={getSelectedCounty}
                >
                  {getCountriesCasesResult?.allCountries.map(
                    (country: string) => (
                      <option key={country} value={country}>
                        {country}
                      </option>
                    )
                  )}
                </select>
                <div className="pointer-events-none absolute right-0 top-0 bottom-0 flex items-center px-2 text-gray-700 border-l">
                  <svg
                    className="h-4 w-4"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                  </svg>
                </div>
              </div>
              <div className="flex p-5 text-center">
                {!isLoadingCountriesData && (
                  <img
                    src={getCountriesCasesResult?.countryFlag}
                    className="object-center h-auto max-w-sm rounded-lg shadow-none transition-shadow duration-300 ease-in-out hover:shadow-lg hover:shadow-black/30"
                    alt={getSelectedCounty}
                  />
                )}
              </div>
            </div>
            <div className="p-5 text-center bg-white">
              {getCountriesCasesResult && !isLoadingCountriesData ? (
                <PieChart pieData={getCountriesCasesResult} />
              ) : (
                <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-blue-600 bg-blue-200 uppercase last:mr-0 mr-1">
                  Chart Loading...
                </span>
              )}
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Dashboard;
