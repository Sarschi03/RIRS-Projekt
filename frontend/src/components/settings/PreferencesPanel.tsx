import { Panel } from "../common/UI";
import AccountForm from "../common/AccountForm";

export default function PreferencesPanel() {
  return (
    <div className="settings-grid">
      <Panel
        title="Nastavitve delovnega prostora"
        subtitle="Prilagodite delovni prostor svojim željam"
      >
        <AccountForm label="Shrani nastavitve">
          <div className="account-form-fields">
            <label>
              Jezik
              <select defaultValue="en">
                <option value="en">Angleščina</option>
                <option value="sl">Slovenščina</option>
              </select>
            </label>
            <label>
              Časovni pas
              <select defaultValue="Europe/Ljubljana">
                <option>Europe/Ljubljana</option>
                <option>Europe/London</option>
                <option>Europe/Berlin</option>
              </select>
            </label>
            <div className="form-grid">
              <label>
                Začetek tedna
                <select defaultValue="Ponedeljek">
                  <option>Ponedeljek</option>
                  <option>Nedelja</option>
                </select>
              </label>
              <label>
                Oblika datuma
                <select defaultValue="DD. MM. LLLL">
                  <option>DD. MM. LLLL</option>
                  <option>MM/DD/LLLL</option>
                  <option>LLLL-MM-DD</option>
                </select>
              </label>
            </div>
          </div>
        </AccountForm>
      </Panel>
      <Panel
        title="Obvestila"
        subtitle="Izberite, o čem želite prejemati obvestila"
      >
        <AccountForm label="Shrani nastavitve">
          <div className="account-form-fields">
            <label className="account-toggle">
              <span>
                <strong>Dodelitev nalog</strong>
                <small>Ko vam je dodeljena naloga.</small>
              </span>
              <input type="checkbox" defaultChecked />
            </label>
            <label className="account-toggle">
              <span>
                <strong>Novosti projektov</strong>
                <small>Novi komentarji in spremembe vaših projektov.</small>
              </span>
              <input type="checkbox" defaultChecked />
            </label>
            <label className="account-toggle">
              <span>
                <strong>Prihajajoči roki</strong>
                <small>Opomniki na bližajoče se naloge.</small>
              </span>
              <input type="checkbox" defaultChecked />
            </label>
            <label className="account-toggle">
              <span>
                <strong>Tedenski povzetek</strong>
                <small>Kratek pregled tedna vaše ekipe.</small>
              </span>
              <input type="checkbox" />
            </label>
          </div>
        </AccountForm>
      </Panel>
    </div>
  );
}
