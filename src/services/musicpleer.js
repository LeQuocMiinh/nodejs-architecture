// The `db` parameter will be inject using the factory associated to `database`
module.exports = db => {
    const put = async (key, value) => {
        try {
            await db.insert(key, value);
            return { ok: true };
        } catch (err) {
            return { ok: false, err };
        }
    };

    const get = async key => {
        try {
            const rawRes = await db.select(key);
            const result = rawRes.map(entry => entry._val);

            return { ok: true, result };
        } catch (err) {
            return { ok: false, err };
        }
    };

    return {
        put,
        get
    };
};

module.exports._inject = ['database'];
