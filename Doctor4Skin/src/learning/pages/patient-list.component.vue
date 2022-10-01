<template>
  <div>
    <div class="card">
      <pv-toolbar class="mb-4">
        <template #start>
          <pv-button
              label="New"
              icon="pi pi-plus"
              class="p-button-success mr-2"
              @click="openNew"
          />
          <pv-button
              label="Delete"
              icon="pi pi-trash"
              class="p-button-danger"
              @click="confirmDeleteSelected"
              :disabled="!selectedPatients || !selectedPatients.length"
          />
        </template>
        <template #end>
          <pv-button
              label="Export"
              icon="pi pi-download"
              class="p-button-help"
              @click="exportToCSV($event)"
          />
        </template>
      </pv-toolbar>
      <pv-data-table
          ref="dt"
          :value="patients"
          v-model:selection="selectedPatients"
          dataKey="id"
          :paginator="true"
          :rows="10"
          :filters="filters"
          paginatorTemplate="FirstPageLink PrevPageLink PageLinks
NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
          :rowsPerPageOptions="[5, 10, 25]"
          currentPageReportTemplate="Showing {first} to {last} of
{totalRecords} patients"
          responsiveLayout="scroll"
      >
        <template #header>
          <div
              class="table-header flex flex-column md:flex-row
md:justify-content-between"
          >
            <h5 class="mb-2 md:m-0 p-as-md-center text-xl">Manage Patients</h5>
            <span class="p-input-icon-left">
<i class="pi pi-search" />
<pv-input-text
    v-model="filters['global'].value"
    placeholder="Search..."
/>
</span>
          </div>
        </template>
        <pv-column
            selectionMode="multiple"
            style="width: 3rem"
            :exportable="false"
        ></pv-column>
        <pv-column
            field="id"
            header="Id"
            :sortable="true"
            style="min-width: 12rem"
        ></pv-column>
        <pv-column
            field="name"
            header="name"
            :sortable="true"
            style="min-width: 16rem"
        ></pv-column>
        <pv-column
            field="age"
            header="age"
            :sortable="true"
            style="min-width: 16rem"
        ></pv-column>
        <pv-column
            field="reservation"
            header="reservation"
            :sortable="true"
            style="min-width: 16rem"
        ></pv-column>
        <pv-column
            field="invoices"
            header="invoices"
            :sortable="true"
            style="min-width: 16rem"
        ></pv-column>
        <pv-column
            field="phone"
            header="phone"
            :sortable="true"
            style="min-width: 16rem"
        ></pv-column>




        <pv-column :exportable="false" style="min-width: 8rem">
          <template #body="slotProps">
            <pv-button
                icon="pi pi-pencil"
                class="p-button-text p-button-rounded"
                @click="editPatient(slotProps.data)"
            />
            <pv-button
                icon="pi pi-trash"
                class="p-button-text p-button-rounded"
                @click="confirmDeletePatient(slotProps.data)"
            />
          </template>
        </pv-column>
      </pv-data-table>
    </div>
    <pv-dialog
        v-model:visible="patientDialog"
        :style="{ width: '450px' }"
        header="Patient Information"
        :modal="true"
        class="p-fluid"
    >
      <div class="field mt-3">
<span class="p-float-label">
<pv-input-text
    type="text"
    id="title"
    v-model.trim="patient.name"
    required="true"
    autofocus
    :class="{ 'p-invalid': submitted && !patient.name }"
/>
<label for="name">Name</label>
<small class="p-error" v-if="submitted && !patient.name">Name is required.</small>
</span>

      </div>
      <div class="field">
<span class="p-float-label">

<pv-input-text

    type="number"
    id="age"
    v-model.trim="patient.age"
    required="true"
    autofocus
    :class="{ 'p-invalid': submitted && !patient.age }"
/>
  <label for="age">Age</label>
<small class="p-error" v-if="submitted && !patient.age">Age is required.</small>

</span>
      </div>

      <div class="field">
<span class="p-float-label">

<pv-input-text

    type="number"
    id="reservation"
    v-model.trim="patient.reservation"
    required="true"
    autofocus
    :class="{ 'p-invalid': submitted && !patient.reservation }"
/>
  <label for="reservation">Reservation</label>
<small class="p-error" v-if="submitted && !patient.reservation">reservation is required.</small>

</span>
      </div>

      <div class="field">
<span class="p-float-label">

<pv-input-text

    type="number"
    id="invoices"
    v-model.trim="patient.invoices"
    required="true"
    autofocus
    :class="{ 'p-invalid': submitted && !patient.invoices }"
/>
  <label for="invoices">Invoices</label>
<small class="p-error" v-if="submitted && !patient.invoices">invoices is required.</small>

</span>
      </div>

      <div class="field">
<span class="p-float-label">

<pv-input-text

    type="number"
    id="phone"
    v-model.trim="patient.phone"
    required="true"
    autofocus
    :class="{ 'p-invalid': submitted && !patient.phone }"
/>
  <label for="phone">Phone</label>
<small class="p-error" v-if="submitted && !patient.phone">phone is required.</small>

</span>
      </div>

      <template #footer>
        <pv-button
            :label="'Cancel'.toUpperCase()"
            icon="pi pi-times"
            class="p-button-text"
            @click="hideDialog"
        />
        <pv-button
            :label="'Save'.toUpperCase()"
            icon="pi pi-check"
            class="p-button-text"
            @click="savePatient"
        />
      </template>
    </pv-dialog>
    <pv-dialog
        v-model:visible="deletePatientDialog"
        :style="{ width: '450px' }"
        header="Confirm"
        :modal="true"
    >
      <div class="confirmation-content">
        <i class="pi pi-exclamation-triangle mr-3" style="font-size:
2rem" />
        <span v-if="patient"
        >Are you sure you want to delete <b>{{ patient.title }}</b
        >?</span
        >
      </div>
      <template #footer>
        <pv-button
            :label="'No'.toUpperCase()"
            icon="pi pi-times"
            class="p-button-text"
            @click="deletePatientDialog = false"
        />
        <pv-button
            :label="'Yes'.toUpperCase()"
            icon="pi pi-check"
            class="p-button-text"
            @click="deletePatient"
        />
      </template>
    </pv-dialog>
    <pv-dialog
        v-model:visible="deletePatientsDialog"
        :style="{ width: '450px' }"
        header="Confirm"
        :modal="true"
    >
      <div class="confirmation-content">
        <i class="pi pi-exclamation-triangle mr-3" style="font-size:
2rem" />
        <span v-if="patient"
        >Are you sure you want to delete the selected patients?</span
        >
      </div>
      <template #footer>
        <pv-button
            :label="'No'.toUpperCase()"
            icon="pi pi-times"
            class="p-button-text"
            @click="deletePatientsDialog = false"
        />
        <pv-button
            :label="'Yes'.toUpperCase()"
            icon="pi pi-check"
            class="p-button-text"
            @click="deleteSelectedPatients"
        />
      </template>
    </pv-dialog>
  </div>
</template>
<script>


import {PatientsApiService} from "../services/patients-api.service";
import { FilterMatchMode } from "primevue/api";
export default {
  name: "patient-list",
  data() {
    return {
      patients:[],
      patientDialog: false,
      deletePatientDialog: false,
      deletePatientsDialog: false,
      patient:{},
      selectedPatients: null,
      filters:{},
      submitted: false,
      patientsService: null,


    };
  },
  created() {
    this.patientsService = new PatientsApiService();
    this.patientsService.getAll().then((response) => {
      this.patients = response.data;
      console.log(this.patients);
      this.patients.forEach((patient) =>
          this.getDisplayablePatient(patient)
      );
      console.log(this.patients);
    });
    this.initFilters();
  },
  methods: {
    getDisplayablePatient(patient) {
      patient.status = patient.published
       return patient;
    },
    getStorablePatient(displayablePatient) {
      return {
        id: displayablePatient.id,
        name: displayablePatient.name,
        age: displayablePatient.age,
        reservation:displayablePatient.reservation,
        invoices:displayablePatient.invoices,
      phone:displayablePatient.phone

      };
    },
    openNew() {
      this.patient = {};
      this.submitted = false;
      this.patientDialog = true;
    },
    hideDialog() {
      this.patientDialog = false;
      this.submitted = false;
    },
    findIndexById(id) {
      console.log(`current id: ${id}`);
      return this.patients.findIndex((patient) => patient.id === id);
    },
    savePatient() {
      this.submitted = true;
      if (this.patient.name.trim()) {
        if (this.patient.id) {
          console.log(this.patient);
          this.patient = this.getStorablePatient(this.patient);
          this.patientsService
              .update(this.patient.id, this.patient)
              .then((response) => {
                console.log(response.data.id);
                this.patients[this.findIndexById(response.data.id)] =
                    this.getDisplayablePatient(response.data);
                this.$toast.add({
                  severity: "success",
                  summary: "Successful",
                  detail: "patients Updated",
                  life: 3000,
                });
                console.log(response);
              });
        } else {
          this.patient.id = 0;
          console.log(this.patient);
          this.patient = this.getStorablePatient(this.patient);
          this.patientsService.create(this.patient).then((response) => {
            this.patient = this.getDisplayablePatient(response.data);
            this.patients.push(this.patient);
            this.$toast.add({
              severity: "success",
              summary: "Successful",
              detail: "Patient Created",
              life: 3000,
            });
            console.log(response);
          });
        }
        this.patientDialog = false;
        this.patient = {};
      }
    },


  editPatient(patient) {
    console.log(patient);
    this.patient = { ...patient };
    console.log(this.patient);
    this.patientDialog = true;
  },
  confirmDeletePatient(patient) {
    this.patient = patient;
    this.deletePatientDialog = true;
  },
  deletePatient() {
    this.patientsService.delete(this.patient.id).then((response) => {
      this.patients = this.patients.filter(
          (t) => t.id !== this.patients.id
      );
      this.deletePatientsDialog = false;
      this.patient = {};
      this.$toast.add({
        severity: "success",
        summary: "Successful",
        detail: "Patient Deleted",
        life: 3000,
      });
      console.log(response);
    });
  },
  exportToCSV() {
    this.$refs.dt.exportCSV();
  },
  confirmDeleteSelected() {
    this.deletePatientsDialog = true;
  },
  deleteSelectedPatients() {
    this.selectedPatients.forEach((patient) => {
      this.patientsService.delete(patient.id).then((response) => {
        this.patients = this.patients.filter(
            (t) => t.id !== this.patient.id
        );
        console.log(response);
      });
    });
    this.deletePatientsDialog = false;
  },
  initFilters() {
    this.filters = {
      global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    };
  },
  },

};
</script>
<style lang="scss" scoped>
.table-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  @media screen and (max-width: 960px) {
    align-items: start;
  }
}
.confirmation-content {
  display: flex;
  align-items: center;
  justify-content: center;
}
@media screen and (max-width: 960px) {
  ::v-deep(.p-toolbar) {
    flex-wrap: wrap;
    .p-button {
      margin-bottom: 0.25rem;
    }
  }
}
</style>