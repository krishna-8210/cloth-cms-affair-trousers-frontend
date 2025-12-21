
import { Route, Routes } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import WorksDefaultPage from "./pages/Works/WorksDefaultPage";
import CreateWorksForm from "./components/forms/CreateWorksForm";
import WorkerDefaultPage from "./pages/Workers/WorkerDefaultPage";
import CreateWorkerForm from "./components/forms/CreateWorkerForm";
import TestForm from "./components/forms/TestForm";
import InventryDefaultPage from "./pages/Inventry/InventryDefaultPage";
import CreateProduct_form_popup from "./components/forms/CreateProduct_form_popup";
import WorkDetailsViewPage from "./pages/Works/WorkDetailsViewPage";
import CreateWorkerRoles from "./components/forms/CreateWorkerRoles";
import WorkerDetailsPage from "./pages/Workers/WorkerDetailsPage";
import WorkerTransactionPage from "./pages/Workers/WorkerTransactionPage";


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
          title={"Works"}
          topnavItems={[
            { id: 1, link: 'create', label: "Create Product", type: 'button' },
            { id: 2, label: '', link: 'list', type: 'popup', element: <CreateWorksForm /> }]
          }
        />} path="/works"

        >
          <Route element={<WorksDefaultPage />} index />
           <Route element={<WorkDetailsViewPage />} path=":work_id" />
        </Route>
        <Route element={<MainLayout
          title={"Worker"}
          topnavItems={[
            { id: 1, link: 'create', label: "Create Product", type: 'button' },
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
          topnavItems={[

            { id: 2, label: '', link: 'list', type: 'popup', element: <CreateProduct_form_popup /> },

          ]
          }
        />} path="/inventry"
        >
          <Route element={<InventryDefaultPage />} index />
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