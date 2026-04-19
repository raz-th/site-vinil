'use client';
import { useState } from "react";
import { useAddresses } from "@/context/AddressContext";
import "./adrese.css";
import { IoMdAdd, IoMdTrash, IoMdCheckmark } from "react-icons/io";

export default function AdreseleMelePage() {
    const { addresses, loading, addAddress, removeAddress, setDefaultAddress } = useAddresses();
    const [showForm, setShowForm] = useState(false);
    const [formData, setFormData] = useState({
        fullName: "", street: "", city: "", county: "", zip: "", phone: ""
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        await addAddress(formData);
        setShowForm(false);
        setFormData({ fullName: "", street: "", city: "", county: "", zip: "", phone: "" });
    };

    if (loading) return (
        <div className="addrPage_loadingWrap">
            <div className="addrPage_spinner"></div>
        </div>
    );

    return (
        <div className="addrPage_page">
            <div className="mainCard_header" style={{ marginBottom: "2rem" }}>
                <p>Produse Favorite</p>
                <div className="fadedLine" />
                <button className="addrPage_addBtn" onClick={() => setShowForm(!showForm)}>
                    <IoMdAdd /> {showForm ? "Anulează" : "Adresă nouă"}
                </button>
            </div>

            {showForm && (
                <form className="addrPage_addressForm" onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder="Nume Complet"
                        required
                        value={formData.fullName}
                        onChange={e => setFormData({ ...formData, fullName: e.target.value })}
                    />
                    <input
                        type="text"
                        placeholder="Stradă și Număr"
                        required
                        value={formData.street}
                        onChange={e => setFormData({ ...formData, street: e.target.value })}
                    />
                    <div className="addrPage_formRow">
                        <input
                            type="text"
                            placeholder="Oraș"
                            required
                            value={formData.city}
                            onChange={e => setFormData({ ...formData, city: e.target.value })}
                        />
                        <input
                            type="text"
                            placeholder="Județ"
                            required
                            value={formData.county}
                            onChange={e => setFormData({ ...formData, county: e.target.value })}
                        />
                    </div>
                    <div className="addrPage_formRow">
                        <input
                            type="text"
                            placeholder="Cod Poștal"
                            required
                            value={formData.zip}
                            onChange={e => setFormData({ ...formData, zip: e.target.value })}
                        />
                        <input
                            type="tel"
                            placeholder="Telefon"
                            required
                            value={formData.phone}
                            onChange={e => setFormData({ ...formData, phone: e.target.value })}
                        />
                    </div>
                    <button type="submit" className="addrPage_saveBtn">Salvează adresa</button>
                </form>
            )}

            <div className="addrPage_addressGrid">
                {addresses.map(addr => (
                    <div key={addr.id} className={`addrPage_addressCard ${addr.isDefault ? "addrPage_default" : ""}`}>
                        {addr.isDefault && (
                            <span className="addrPage_defaultBadge">
                                <IoMdCheckmark /> Implicită
                            </span>
                        )}
                        <div className="addrPage_addrInfo">
                            <strong>{addr.fullName}</strong>
                            <p>{addr.street}</p>
                            <p>{addr.city}, {addr.county}, {addr.zip}</p>
                            <p className="addrPage_addrPhone">{addr.phone}</p>
                        </div>
                        <div className="addrPage_addrActions">
                            {!addr.isDefault && (
                                <button onClick={() => setDefaultAddress(addr.id)}>
                                    Setează implicită
                                </button>
                            )}
                            <button className="addrPage_delBtn" onClick={() => removeAddress(addr.id)}>
                                <IoMdTrash />
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}