import axios from "axios";
import WorldWideCasesType from "../types/DashboardTypes/WorldWideCasesType";
import HistoricalCasesType from "../types/DashboardTypes/HistoricalCasesType";
import { CountriesCasesType } from "../types/DashboardTypes/CountriesCasesType";

const apiClient = axios.create({
  baseURL: "https://disease.sh/v3/covid-19",
  headers: {
    "Content-type": "application/json",
  },
});

const GetAllWorldWideCasesData = async () => {
  const response = await apiClient.get<WorldWideCasesType>("/all");
  return response.data;
};

const GetHistoricalCasesData = async () => {
  const response = await apiClient.get<HistoricalCasesType>(
    "/historical/all?lastdays=all"
  );
  return response.data;
};

const GetCountriesCasesData = async () => {
  const response = await apiClient.get<Array<CountriesCasesType>>("/countries");
  return response.data;
};

const DashboardService = {
  GetAllWorldWideCasesData,
  GetHistoricalCasesData,
  GetCountriesCasesData,
};

export default DashboardService;
