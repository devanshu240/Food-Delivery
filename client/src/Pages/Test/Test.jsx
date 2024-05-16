import { useState } from "react";
import Model from "react-modal";

const Test = () => {
    const [visible, setVisible] = useState(false);
    return (
        <>
            <div>
                <button onClick={() => setVisible(true)}>Open Model</button>
                <Model isOpen={visible} onRequestClose={() => setVisible(false)} style={{
                    overlay: {
                        background: "black"
                    },
                    content: {
                        width: "500px",
                        height: "500px"
                    }
                }}>
                    {/* <button onClick={() => setVisible(false)}>X</button> */}
                    <form>
                        <input
                            type="text"
                            //   value={updatedName}
                            //   onChange={(e) => setUpdatedName(e.target.value)}
                            placeholder="Product Name"
                            required
                        />
                        <input
                            type="number"
                            //   value={updatedPrice}
                            //   onChange={(e) => setUpdatedPrice(e.target.value)}
                            placeholder="Price"
                            required
                        />
                        <textarea
                            //   value={updatedDescription}
                            //   onChange={(e) => setUpdatedDescription(e.target.value)}
                            placeholder="Description"
                            required
                        ></textarea>
                        <select
                            //   value={updatedType}
                            //   onChange={(e) => setUpdatedType(e.target.value)}
                            required
                        >
                            <option value="">Select Type</option>
                            <option value="type1">Type 1</option>
                            <option value="type2">Type 2</option>
                            <option value="type3">Type 3</option>
                        </select>
                        <button type="submit">Update</button>
                    </form>
                </Model>
            </div>
        </>
    )
}

export default Test;