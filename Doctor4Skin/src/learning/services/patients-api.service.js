import http from '../../core/services/http-common';
export class PatientsApiService {
    getAll() {
        return http.get('/patients');
    }
    getById(id) {
        return http.get(`/patients/${id}`);
    }
    create(data) {
        return http.post('/patients', data);
    }
    update(id, data) {
        return http.put(`/patients/${id}`, data);
    }
    delete(id) {
        return http.delete(`/patients/${id}`);
    }
    findByTitle(title) {
        return http.get(`/patients?title=${title}`);
    }
}
