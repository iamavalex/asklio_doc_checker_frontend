import Criteria from "@/app/components/Criteria";

export default function Home() {
    return (
        <div className="w-full max-w-4xl p-4 flex flex-col items-center">
            <div className="mt-8 w-full flex justify-center">
                <Criteria />
            </div>
        </div>
    );
}
