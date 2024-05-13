import { useContext, useEffect, useState } from "react";
import EventContext from "@/context/Event/EventContext";
import axiosInstance from "@/axiosInstance";
import Title from "@/components/ui/Title";
import ProductCard from "@/components/AdminModule/Cards/ProductCard";
import { useParams } from "react-router-dom";
import CompradoresTable from "../../../components/AdminModule/Tables/CompradoresTable";

const getUsersWithOrdersDataEndpoint = (produto_id) => {
  return `/admin/loja/produtos/${produto_id}/compradores`;
};

const AdminCompradores = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { produto_id } = useParams();
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axiosInstance.get(
          getUsersWithOrdersDataEndpoint(produto_id)
        );

        const mappedResponse = data.map((item) => {
          return {
            uuid_user: item.uuid_user,
            nome: item.nome,
            email: item.email,

          };
        });

        setTableData(mappedResponse);

        console.log(tableData);
      } catch (error) {
        console.error("Erro ao buscar inscritos:", error);
        toast.error("Erro ao buscar inscritos.");
      }
      setIsLoading(false);
    };

    fetchData();
  }, []);
  return (
    <div className="py-8">
      <Title title={"Compradores"} />
      <CompradoresTable data={tableData}/>
    </div>
  );
};

export default AdminCompradores;
