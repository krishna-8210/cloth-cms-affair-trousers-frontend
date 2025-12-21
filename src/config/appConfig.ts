
const mode:string='dev';
const development_server='http://localhost:6101';
const client_server='http://localhost:6001';
const production_server='https://classlist-server2.vercel.app';

export default {
    BASEURL:mode=='prod'?production_server:development_server,
    mode,
    shareDomain:'http://localhost:5173',
    client_server
}