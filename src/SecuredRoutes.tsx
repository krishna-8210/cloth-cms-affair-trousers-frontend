
import { Route, Routes } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import WorksDefaultPage from "./pages/Works/WorksDefaultPage";
import CreateWorksForm from "./components/forms/CreateWorksForm";
import WorkerDefaultPage from "./pages/Workers/WorkerDefaultPage";
import CreateWorkerForm from "./components/forms/CreateWorkerForm";
import InventryDefaultPage from "./pages/Inventry/InventryDefaultPage";
import WorkDetailsViewPage from "./pages/Works/WorkDetailsViewPage";
import CreateWorkerRoles from "./components/forms/CreateWorkerRoles";
import WorkerDetailsPage from "./pages/Workers/WorkerDetailsPage";
import WorkerTransactionPage from "./pages/Workers/WorkerTransactionPage";
import InventryDetailsViewPage from "./pages/Inventry/InventryDetailsViewPage";
import CreateCustomerFormPopup from "./components/forms/customer/CreateCustomerFormPopup";
import CreateAgentFormPopup from "./components/forms/CreateAgentFormPopup";
import CreateInvoiceFormPopup from "./components/forms/CreateInvoiceFormPopup";
import CustomerDefaultPage from "./pages/customers/CustomerDefaultPage";
import CustomerDetailsPage from "./pages/customers/CustomerDetailsPage";
import AgentDefaultPage from "./pages/agents/AgentDefaultPage";
import AgentDetailsPage from "./pages/agents/AgentDetailsPage";
import InvoiceDefaultPages from "./pages/invoice/InvoiceDefaultPages";
import InvoiceDetailsPage from "./pages/invoice/InvoiceDetailsPage";
import BarcodeGenerateForm from "./components/forms/BarcodeGenerateForm";
import CustomerTransactionListPage from "./pages/customers/CustomerTransactionListPage";
import CreateColorFormPopup from "./components/forms/CreateColorFormPopup";
import CreateReturnInvoiceFormPopup from "./components/forms/CreateReturnInvoiceFormPopup";
import InventryListPage from "./pages/Inventry/InventryListPage";



function SecuredRoutes() {

  return (
    <>
      <Routes>
        <Route element={<MainLayout topnavItems={[]} title={"Home"} />} path="/" >
          <Route element={<div>home</div>} index />
          <Route element={<div>Create Product Page</div>} path="create" />
          <Route element={<div>Product List Page</div>} path="list" />
        </Route>
        <Route element={<MainLayout
          title={"Lots"}
          topnavItems={[
            { id: 2, label: '', link: 'list', type: 'popup', element: <CreateWorksForm /> },
            { id: 3, label: '', link: 'list', type: 'popup', element: <CreateColorFormPopup /> }
          
          
          ]
          }
        />} path="/works"
        >
          <Route element={<WorksDefaultPage />} index />
          <Route element={<WorkDetailsViewPage />} path=":work_id" />
        </Route>
        <Route element={<MainLayout
          title={"Worker"}
          topnavItems={[
            // { id: 1, link: 'create', label: "Create Product", type: 'button' },
            { id: 2, label: '', link: 'list', type: 'popup', element: <CreateWorkerForm /> },
            { id: 3, label: '', link: 'list', type: 'popup', element: <CreateWorkerRoles /> },
          ]
          }
        />} path="/workers"
        >
          <Route element={<WorkerDefaultPage />} index />     
          <Route element={<WorkerDetailsPage />} path=":worker_id" />
          <Route element={<WorkerTransactionPage />} path=":worker_id/transactions" />
        </Route>
        <Route element={<MainLayout
          title={"Inventry"}
          topnavItems={[]}
        />} path="/inventry"
        >
          <Route element={<InventryDefaultPage />} index />
          <Route path=":inventry_id" element={<InventryDetailsViewPage />} />
          <Route path=":inventry_id/inventry-record-list" element={<InventryListPage />} />
        </Route>
        <Route element={<MainLayout
          title={"Customers"}
          topnavItems={[
            { id: 1, label: '', link: 'list', type: 'popup', element: <CreateCustomerFormPopup /> },
                 { id: 1, label: '', link: 'list', type: 'popup', element: <BarcodeGenerateForm /> },
          ]}
        />} path="/customers"
        >
          <Route element={<CustomerDefaultPage />} index />
          <Route path=":customer_id" element={<CustomerDetailsPage />} />
          <Route element={<CustomerTransactionListPage />} path=":customer_id/transactions" />
        </Route>
        <Route element={<MainLayout
          title={"Agent"}
          topnavItems={[
            { id: 1, label: '', link: 'list', type: 'popup', element: <CreateAgentFormPopup /> },
          ]}
        />} path="/agent" >
          <Route element={<AgentDefaultPage />} index />
          <Route path=":agent_id" element={<AgentDetailsPage />} />
        </Route>
        {/* invoices */}
        <Route element={<MainLayout
          title={"Invoices"}
          topnavItems={[
            { id: 1, label: '', link: 'list', type: 'popup', element: <CreateInvoiceFormPopup /> },
            { id: 2, label: '', link: 'list', type: 'popup', element: <CreateReturnInvoiceFormPopup /> },
          ]}
        />} path="/invoices" >
          <Route element={<InvoiceDefaultPages />} index />
          <Route path=":invoice_id" element={<InvoiceDetailsPage />} />
        </Route>
        {/* 

        <Route element={<Layout2 title={"Products"} topnavItems={[{ id: 1, link: 'create', label: "Create Product" }, { id: 2, link: 'list', type: 'popup', element: <ProductGroupForm /> }]} />} path="/products" >
          <Route element={<ProductsDefaultPage />} index />
          <Route element={<div>Create Product Page</div>} path="create" />
          <Route element={<div>Product List Page</div>} path="list" />
        </Route>
        <Route element={<Layout2 title={"Making Charges"} topnavItems={[{ id: 1, link: 'create', label: "Create Product" }, { id: 2, link: 'list', type: 'popup', element: <MakingChargeCreateForm /> }]} />} path="/making_charge" >
          <Route element={<MakingChargeDefaultPage />} index />
   
        </Route>

        <Route element={<Layout2 title={"Items"} topnavItems={[{ id: 1, link: 'create', label: "Add Item", type: 'popup', element: <UploadTest /> }, { id: 2, link: 'list', type: 'popup', element: <ItemCreateForm /> }]} />} path="/items" >
          <Route element={<ItemsDefaultPage />} index />
          <Route element={<div>Create Product Page</div>} path="create" />
          <Route element={<div>Product List Page</div>} path="list" />
        </Route>

        <Route path="/pricing" element={<Layout2 title={"Pricing"} topnavItems={[{ id: 1, link: 'create', label: "Create Product" }, { id: 2, link: 'list', label: "Product list" }]} />} >
          <Route element={<PricingPage />} index />
          <Route element={<div>Create Product Page</div>} path="create" />
          <Route element={<div>Product List Page</div>} path="list" />
        </Route>

        <Route path="/profile" element={<Layout2 title={"Profile"} topnavItems={[{ id: 1, link: 'create', label: "Create Product" }, { id: 2, link: 'list', label: "Product list" }]} />} >
          <Route element={<ProfileDefaultPage />} index />
        </Route>

        <Route path="/website" element={<Layout2 title={"Website Setting"} topnavItems={[{ id: 1, link: 'home-page', label: "Home Page" }, { id: 2, link: 'home-page2', label: "Home page 2" },{ id: 2, link: 'category', label: "Category" }]} />} >
          <Route element={<WebsiteDefaultpage />} index />
            <Route element={<HomePageSetting/>} path="home-page" />
            <Route element={<HomePageSetting2/>} path="home-page2" />
            <Route element={<CategoryTemplateCreater/>} path="category" />
        </Route>

        <Route path="/image" element={<Layout2 title={"Images"} topnavItems={[{ id: 1, link: 'home-page',type:'popup',element:<ImageFolderAdd/> }, { id: 2, type: 'popup',element:<ImageUpload_media_section/>}]} />} >
          <Route element={<ImageSectionDefaultPage />} index />
         
        </Route>

        <Route path="/Category" element={<Layout2 title={"Categoty"} topnavItems={[{ id: 1, link: 'create', label: "Create Category", type: 'popup', element: <CreateCategoryForm /> }, { id: 2, link: 'list', type: 'popup', element: <CreateSubCategoryForm />, label: "+SubCategory" }]} />} >
          <Route element={<CategoryDefaultPage />} index />
          <Route element={<div>Create Product Page</div>} path="create" />
          <Route element={<div>Product List Page</div>} path="list" />
        </Route>

        <Route path="/group" element={<Layout2 title={"Categoty"} topnavItems={[{ id: 1, link: 'create', label: "Create Category", type: 'popup', element: <CreateCategoryForm /> }, { id: 2, link: 'list', type: 'popup', element: <CreateSubCategoryForm />, label: "+SubCategory" }]} />} >
          <Route element={<CategoryDefaultPage />} index />
         
        </Route>

        <Route path="/Metals" element={<Layout2 title={"Metals"} topnavItems={[{ id: 1, link: 'create', label: "Create Product", type: 'popup', element: <CreateMetal /> }, { id: 2, type: 'popup', element: <CreateMetalType />, link: 'list', label: "Product list" }]} />} >
          <Route element={<MetalDefaultPage />} index />
          <Route element={<div>Create Product Page</div>} path="create" />
          <Route element={<div>Product List Page</div>} path="list" />
        </Route> */}

      </Routes>
    </>
  )
}

export default SecuredRoutes